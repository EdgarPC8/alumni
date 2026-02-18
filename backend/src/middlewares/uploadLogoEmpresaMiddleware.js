import multer from "multer";
import path from "path";
import fs from "fs";
import fileDirName from "../libs/file-dirname.js";
import { unlink } from "fs/promises";
import { Empresa } from "../models/Empresa.js";

const { __dirname } = fileDirName(import.meta);

const IMG_BASE_DIR = path.join(__dirname, "../img");
const LOGOS_FOLDER_REL = "alumni/empresas";
const LOGOS_DESTINATION = path.join(IMG_BASE_DIR, LOGOS_FOLDER_REL);

if (!fs.existsSync(LOGOS_DESTINATION)) {
  fs.mkdirSync(LOGOS_DESTINATION, { recursive: true });
}

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(LOGOS_DESTINATION)) {
      fs.mkdirSync(LOGOS_DESTINATION, { recursive: true });
    }
    cb(null, LOGOS_DESTINATION);
  },
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || ".jpg").toLowerCase();
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const safeExt = allowed.includes(ext) ? ext : ".jpg";
    const empresaId = req.params?.id || "new";
    const filename = `logo_empresa${empresaId}_${Date.now()}${safeExt}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes (jpg, png, webp, gif)"));
  }
};

const upload = multer({ storage: diskStorage, fileFilter }).single("logo");

const safeUnlink = async (fullPath) => {
  try {
    await unlink(fullPath);
  } catch {
    // ignorar si no existe
  }
};

/** Subir logo de empresa por ID (admin) */
export const uploadLogoEmpresa = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message || "Error al subir el logo" });
    }
    try {
      if (!req.file?.filename) {
        return res.status(400).json({ message: "No se recibió archivo de imagen" });
      }
      const newRelPath = `${LOGOS_FOLDER_REL}/${req.file.filename}`;
      const empresaId = req.params.id;
      const empresa = await Empresa.findByPk(empresaId);
      if (!empresa) {
        await safeUnlink(path.join(LOGOS_DESTINATION, req.file.filename));
        return res.status(404).json({ message: "Empresa no encontrada" });
      }
      const oldRelPath = empresa.logo || null;
      await empresa.update({ logo: newRelPath });
      if (oldRelPath && oldRelPath !== newRelPath) {
        const oldFullPath = path.join(IMG_BASE_DIR, oldRelPath);
        await safeUnlink(oldFullPath);
      }
      return res.json({ message: "Logo subido con éxito", logo: newRelPath });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  });
};

/** Subir logo de empresa propio (usuario con rol Empresa) */
export const uploadLogoEmpresaPerfil = async (req, res) => {
  const accountId = req.user?.accountId;
  if (!accountId) return res.status(401).json({ message: "No autenticado" });
  const empresa = await Empresa.findOne({ where: { accountId } });
  if (!empresa) return res.status(404).json({ message: "No tiene perfil de empresa" });
  req.params = req.params || {};
  req.params.id = empresa.id;
  return uploadLogoEmpresa(req, res);
};

/** Eliminar logo de empresa - reutiliza lógica para perfil */
export const deleteLogoEmpresaPerfil = async (req, res) => {
  const accountId = req.user?.accountId;
  if (!accountId) return res.status(401).json({ message: "No autenticado" });
  const empresa = await Empresa.findOne({ where: { accountId } });
  if (!empresa) return res.status(404).json({ message: "No tiene perfil de empresa" });
  req.params = { id: empresa.id };
  return deleteLogoEmpresa(req, res);
};

/** Eliminar logo de empresa */
export const deleteLogoEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const empresa = await Empresa.findByPk(id);
    if (!empresa) return res.status(404).json({ message: "Empresa no encontrada" });
    const oldRelPath = empresa.logo;
    if (!oldRelPath) return res.status(404).json({ message: "No hay logo para eliminar" });
    const fullPath = path.join(IMG_BASE_DIR, oldRelPath);
    await safeUnlink(fullPath);
    await empresa.update({ logo: null });
    return res.json({ message: "Logo eliminado" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
