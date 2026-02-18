

  // src/routes/ImgRoutes.js

import { Router } from "express";



import {
  uploadImage,
  deleteImage,
  scanImages as scanImagesController,
  downloadFolderZip,
  getUnusedImages,
} from "../controllers/ImgController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddelware.js";
import {     
    makeImageUpload,
    deleteImage as deleteImageMiddleware,
    scanImages,
    deleteFolder, 
} from "../middlewares/imgMiddleware.js";



const router = new Router();

router.get(
  "/download",
  isAuthenticated, 
  downloadFolderZip
);


router.post(
  "/upload",
  isAuthenticated,
  makeImageUpload({ fieldName: "file" }),
  uploadImage
);

// ELIMINAR
// DELETE /eddeliapi/img/delete?relPath=EdDeli/products/a.png
router.delete(
  "/delete",
  isAuthenticated,
  deleteImageMiddleware(),
  deleteImage
);

// ESCANEAR
// GET /alumniapi/img/scan?folder=alumni&maxDepth=5
router.get(
  "/scan",
  isAuthenticated,
  scanImages(),
  scanImagesController,
);

// IMÁGENES NO UTILIZADAS (solo Admin/Programador)
// GET /alumniapi/img/unused
router.get("/unused", isAuthenticated, isAdmin, getUnusedImages);

// DELETE /alumniapi/img/folder?folder=alumni/empresas
router.delete("/folder", isAuthenticated, deleteFolder(), (req, res) => {
  res.json({ ok: true, ...req.imageManager });
});
export default router;
