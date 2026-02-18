import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddelware.js";
import {
  getPerfilEmpresa,
  crearPerfilEmpresa,
  actualizarPerfilEmpresa,
  getEmpresas,
  crearEmpresaAdmin,
  actualizarEmpresaAdmin,
  getAccountsParaVincularEmpresa,
  getMisOfertas,
} from "../controllers/BolsaEmpleoController.js";
import { uploadLogoEmpresa, uploadLogoEmpresaPerfil, deleteLogoEmpresa, deleteLogoEmpresaPerfil } from "../middlewares/uploadLogoEmpresaMiddleware.js";
import {
  crearOferta,
  actualizarOferta,
  cambiarEstadoOferta,
  getOfertasPublicas,
  getOfertaById,
  postularse,
  getPostulantes,
  actualizarEstadoPostulacion,
  getMisPostulaciones,
  getCareersForBolsa,
} from "../controllers/BolsaEmpleoController.js";

const router = Router();
const prefix = "/bolsa-empleo";

// Públicas (ofertas activas)
router.get(`${prefix}/ofertas`, getOfertasPublicas);
router.get(`${prefix}/ofertas/:id`, getOfertaById);
router.get(`${prefix}/careers`, getCareersForBolsa);

// Autenticadas
router.use(isAuthenticated);

// Perfil Empresa
router.get(`${prefix}/empresa/perfil`, getPerfilEmpresa);
router.post(`${prefix}/empresa/perfil`, crearPerfilEmpresa);
router.put(`${prefix}/empresa/perfil`, actualizarPerfilEmpresa);
router.put(`${prefix}/empresa/perfil/logo`, uploadLogoEmpresaPerfil);
router.delete(`${prefix}/empresa/perfil/logo`, deleteLogoEmpresaPerfil);

// Admin: empresas (accounts-vincular antes de :id)
router.get(`${prefix}/admin/empresas`, getEmpresas);
router.get(`${prefix}/admin/empresas/accounts-vincular`, getAccountsParaVincularEmpresa);
router.post(`${prefix}/admin/empresas`, crearEmpresaAdmin);
router.put(`${prefix}/admin/empresas/:id`, actualizarEmpresaAdmin);
router.put(`${prefix}/admin/empresas/:id/logo`, isAdmin, uploadLogoEmpresa);
router.delete(`${prefix}/admin/empresas/:id/logo`, isAdmin, deleteLogoEmpresa);

// Ofertas (Empresa o Admin)
router.get(`${prefix}/empresa/ofertas`, getMisOfertas);
router.post(`${prefix}/empresa/ofertas`, crearOferta);
router.put(`${prefix}/empresa/ofertas/:id`, actualizarOferta);
router.patch(`${prefix}/empresa/ofertas/:id/estado`, cambiarEstadoOferta);

// Postulantes (Empresa)
router.get(`${prefix}/empresa/ofertas/:id/postulantes`, getPostulantes);
router.patch(`${prefix}/empresa/postulaciones/:id`, actualizarEstadoPostulacion);

// Postularse y mis postulaciones (Graduado/Egresado/Estudiante)
router.post(`${prefix}/ofertas/:id/postular`, postularse);
router.get(`${prefix}/mis-postulaciones`, getMisPostulaciones);

export default router;
