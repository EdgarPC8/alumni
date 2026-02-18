// src/controllers/ImgController.js
import path from "path";
import fs from "fs";
import fsp from "fs/promises";
import archiver from "archiver";
import fileDirName from "../libs/file-dirname.js";
import { Users } from "../models/Users.js";
import { Empresa } from "../models/Empresa.js";

const { __dirname } = fileDirName(import.meta);
const IMG_BASE_DIR = path.resolve(__dirname, "../img");
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

const safeRelPath = (rel = "") => {
  const s = String(rel || "").replace(/\\/g, "/").trim();
  if (s.includes("..")) throw new Error("Ruta inválida");
  if (s.startsWith("/") || s.startsWith("~")) throw new Error("Ruta inválida");
  if (!/^[a-zA-Z0-9/._\- ]*$/.test(s)) throw new Error("Ruta inválida");
  return s;
};

export const downloadFolderZip = async (req, res) => {
  try {
    const folderRel = safeRelPath(req.query.folder || ""); // "" => todo img
    const folderAbs = path.resolve(IMG_BASE_DIR, folderRel);

    if (!folderAbs.startsWith(IMG_BASE_DIR)) {
      return res.status(400).json({ ok: false, message: "Ruta inválida" });
    }

    if (!fs.existsSync(folderAbs)) {
      return res.status(404).json({ ok: false, message: "Carpeta no existe" });
    }
    if (!fs.statSync(folderAbs).isDirectory()) {
      return res.status(400).json({ ok: false, message: "folder no es una carpeta" });
    }

    const zipName = `${(folderRel || "img").replace(/[\/\\]/g, "_")}.zip`;

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename="${zipName}"`);

    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      console.error("ZIP error:", err);
      if (!res.headersSent) res.status(500).json({ ok: false, message: "Error creando ZIP" });
    });

    archive.pipe(res);

    // mete TODA la carpeta (subcarpetas incluidas)
    archive.directory(folderAbs, folderRel || "img");

    await archive.finalize();
  } catch (e) {
    return res.status(400).json({ ok: false, message: e.message });
  }
};


export const uploadImage = async (req, res) => {
    // El middleware ya subió y validó todo
    const img = req.imageManager;
  
    return res.json({
      ok: true,
      message: img.replaced
        ? "Imagen reemplazada correctamente"
        : "Imagen subida correctamente",
      data: {
        fileName: img.fileName,
        relativePath: img.relativePath,
        folder: img.folderRel,
        size: img.file?.size,
      },
    });
  };
  
  export const deleteImage = async (req, res) => {
    return res.json({
      ok: true,
      message: "Imagen eliminada correctamente",
      data: req.imageManager,
    });
  };
  
  export const scanImages = async (req, res) => {
    return res.json({
      ok: true,
      folder: req.imageScan.folderRel,
      totals: req.imageScan.totals,
      files: req.imageScan.files,
    });
  };

// ==============================
// Imágenes no utilizadas (no referenciadas en BD)
// ==============================
const formatBytes = (bytes = 0) => {
  const b = Number(bytes || 0);
  if (b < 1024) return `${b} B`;
  const kb = b / 1024;
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
};

const normalizePath = (p = "") =>
  String(p || "").replace(/\\/g, "/").trim().replace(/^\/+/, "");

export const getUnusedImages = async (req, res) => {
  try {
    // 1) Obtener todas las rutas de imágenes usadas en la BD
    const [users, empresas] = await Promise.all([
      Users.findAll({ attributes: ["photo"], raw: true }),
      Empresa.findAll({ attributes: ["logo"], raw: true }),
    ]);

    const usedPaths = new Set();
    for (const u of users) {
      const p = normalizePath(u?.photo);
      if (p) usedPaths.add(p);
    }
    for (const e of empresas) {
      const p = normalizePath(e?.logo);
      if (p) usedPaths.add(p);
    }

    // 2) Recorrer todas las imágenes en disco
    const walk = async (rootFull, rootRel, depth, maxDepth = 15) => {
      if (depth > maxDepth) return [];
      const entries = await fsp.readdir(rootFull, { withFileTypes: true }).catch(() => []);
      const out = [];

      for (const ent of entries) {
        const full = path.join(rootFull, ent.name);
        const rel = path.join(rootRel, ent.name).replace(/\\/g, "/");

        if (rel.includes("..")) continue;

        if (ent.isDirectory()) {
          out.push(...(await walk(full, rel, depth + 1, maxDepth)));
        } else if (ent.isFile()) {
          const ext = path.extname(ent.name).toLowerCase();
          if (!IMG_EXT.has(ext)) continue;

          const st = await fsp.stat(full).catch(() => null);
          if (!st) continue;

          const relNorm = normalizePath(rel);
          const isUsed = usedPaths.has(relNorm);
          out.push({
            relPath: rel,
            name: ent.name,
            ext,
            sizeBytes: st.size,
            sizeHuman: formatBytes(st.size),
            mtime: st.mtime,
            isUsed,
          });
        }
      }
      return out;
    };

    const allFiles = await walk(IMG_BASE_DIR, "", 0);
    const unused = allFiles.filter((f) => !f.isUsed);
    const totalSize = unused.reduce((acc, f) => acc + (f.sizeBytes || 0), 0);

    return res.json({
      ok: true,
      files: unused,
      totals: {
        totalFiles: unused.length,
        totalSizeBytes: totalSize,
        totalSizeHuman: formatBytes(totalSize),
      },
    });
  } catch (e) {
    console.error("Error getUnusedImages:", e);
    return res.status(500).json({ ok: false, message: e?.message || "Error al obtener imágenes no utilizadas" });
  }
};
