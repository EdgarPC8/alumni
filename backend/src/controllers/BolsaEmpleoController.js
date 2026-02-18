import { Empresa } from "../models/Empresa.js";
import { OfertaLaboral } from "../models/OfertaLaboral.js";
import { Postulacion } from "../models/Postulacion.js";
import { Users } from "../models/Users.js";
import { Professionals } from "../models/CV.js";
import { Account } from "../models/Account.js";
import { Roles } from "../models/Roles.js";
import { Careers } from "../models/Alumni.js";
import { Notifications } from "../models/Notifications.js";
import { sendNotificationToUser } from "../sockets/notificationSocket.js";
import { Op } from "sequelize";

const ROL_EMPRESA = "Empresa";
const ROLES_PUEDEN_POSTULAR = ["Estudiante", "Profesional"];
const ROLES_ADMIN = ["Administrador", "Programador"];

/** Verificar si el usuario es administrador */
async function userIsAdmin(accountId) {
  const account = await Account.findByPk(accountId, {
    include: [{ model: Roles, as: "roles", through: { attributes: [] } }],
  });
  if (!account?.roles) return false;
  return account.roles.some((r) => ROLES_ADMIN.includes(r.name));
}

/** Obtener empresa por accountId (si tiene rol Empresa) */
async function getEmpresaByAccountId(accountId) {
  return await Empresa.findOne({ where: { accountId } });
}

/** Verificar si el usuario tiene rol Empresa */
async function userHasRoleEmpresa(accountId) {
  const account = await Account.findByPk(accountId, {
    include: [{ model: Roles, as: "roles", through: { attributes: [] } }],
  });
  if (!account?.roles) return false;
  return account.roles.some((r) => r.name === ROL_EMPRESA);
}

/** Verificar si el usuario puede postularse (Estudiante = egresado, Profesional = graduado) */
async function userCanPostular(accountId) {
  const account = await Account.findByPk(accountId, {
    include: [{ model: Roles, as: "roles", through: { attributes: [] } }],
  });
  if (!account?.roles) return false;
  return account.roles.some((r) => ROLES_PUEDEN_POSTULAR.includes(r.name));
}

// ========== PERFIL EMPRESA ==========
export const getPerfilEmpresa = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const tieneRol = await userHasRoleEmpresa(accountId);
    if (!tieneRol) return res.status(403).json({ message: "No tiene rol Empresa" });

    const empresa = await Empresa.findOne({
      where: { accountId },
      include: [{ model: OfertaLaboral, as: "ofertaLaborals", attributes: ["id", "titulo", "estado"] }],
    });

    if (!empresa) return res.json(null);
    res.json(empresa);
  } catch (error) {
    console.error("Error getPerfilEmpresa:", error);
    res.status(500).json({ message: error.message });
  }
};

export const crearPerfilEmpresa = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const tieneRol = await userHasRoleEmpresa(accountId);
    if (!tieneRol) return res.status(403).json({ message: "No tiene rol Empresa" });

    const existente = await Empresa.findOne({ where: { accountId } });
    if (existente) return res.status(400).json({ message: "Ya tiene perfil de empresa" });

    const empresa = await Empresa.create({ ...req.body, accountId });
    res.status(201).json(empresa);
  } catch (error) {
    console.error("Error crearPerfilEmpresa:", error);
    res.status(500).json({ message: error.message });
  }
};

export const actualizarPerfilEmpresa = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const empresa = await Empresa.findOne({ where: { accountId } });
    if (!empresa) return res.status(404).json({ message: "Perfil de empresa no encontrado" });

    await empresa.update(req.body);
    res.json(empresa);
  } catch (error) {
    console.error("Error actualizarPerfilEmpresa:", error);
    res.status(500).json({ message: error.message });
  }
};

// ========== ADMIN: Empresas ==========
export const getEmpresas = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    if (!esAdmin) return res.status(403).json({ message: "Solo administradores pueden ver el listado de empresas" });

    const empresas = await Empresa.findAll({
      where: { activo: true },
      include: [
        { model: OfertaLaboral, as: "ofertaLaborals", attributes: ["id", "titulo", "estado"] },
        {
          model: Account,
          as: "account",
          required: false,
          attributes: ["id", "username", "userId"],
          include: [{ model: Users, as: "user", attributes: ["id", "firstName", "firstLastName", "ci", "photo"] }],
        },
      ],
      order: [["razonSocial", "ASC"]],
    });
    res.json(empresas);
  } catch (error) {
    console.error("Error getEmpresas:", error);
    res.status(500).json({ message: error.message });
  }
};

/** Admin: crear empresa (con o sin usuario vinculado) */
export const crearEmpresaAdmin = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    if (!esAdmin) return res.status(403).json({ message: "Solo administradores pueden crear empresas" });

    const { accountId: linkAccountId, ...restBody } = req.body;
    const data = { ...restBody, activo: true };

    if (linkAccountId) {
      const tieneRolEmpresa = await userHasRoleEmpresa(linkAccountId);
      if (!tieneRolEmpresa) return res.status(400).json({ message: "El usuario vinculado debe tener rol Empresa" });
      const yaTieneEmpresa = await Empresa.findOne({ where: { accountId: linkAccountId } });
      if (yaTieneEmpresa) return res.status(400).json({ message: "Ese usuario ya está vinculado a otra empresa" });
      data.accountId = linkAccountId;
    } else {
      data.accountId = null;
    }

    const empresa = await Empresa.create(data);
    res.status(201).json(empresa);
  } catch (error) {
    console.error("Error crearEmpresaAdmin:", error);
    res.status(500).json({ message: error.message });
  }
};

/** Admin: actualizar empresa (incl. vincular/desvincular usuario) */
export const actualizarEmpresaAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    if (!esAdmin) return res.status(403).json({ message: "Solo administradores pueden editar empresas" });

    const empresa = await Empresa.findByPk(id);
    if (!empresa) return res.status(404).json({ message: "Empresa no encontrada" });

    const { accountId: linkAccountId, ...restBody } = req.body;

    if (linkAccountId !== undefined) {
      if (linkAccountId === null || linkAccountId === "") {
        restBody.accountId = null;
      } else {
        const tieneRolEmpresa = await userHasRoleEmpresa(linkAccountId);
        if (!tieneRolEmpresa) return res.status(400).json({ message: "El usuario vinculado debe tener rol Empresa" });
        const otraEmpresa = await Empresa.findOne({ where: { accountId: linkAccountId } });
        if (otraEmpresa && otraEmpresa.id !== parseInt(id, 10)) {
          return res.status(400).json({ message: "Ese usuario ya está vinculado a otra empresa" });
        }
        restBody.accountId = linkAccountId;
      }
    }

    await empresa.update(restBody);
    res.json(empresa);
  } catch (error) {
    console.error("Error actualizarEmpresaAdmin:", error);
    res.status(500).json({ message: error.message });
  }
};

/** Admin: cuentas con rol Empresa disponibles para vincular (sin empresa o la que se está editando) */
export const getAccountsParaVincularEmpresa = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    if (!esAdmin) return res.status(403).json({ message: "Solo administradores" });

    const { empresaId } = req.query;

    const accounts = await Account.findAll({
      include: [
        { model: Roles, as: "roles", through: { attributes: [] }, where: { name: ROL_EMPRESA } },
        { model: Users, as: "user", attributes: ["id", "firstName", "firstLastName"] },
      ],
      attributes: ["id", "username", "userId"],
    });

    const empresas = await Empresa.findAll({
      where: { accountId: { [Op.ne]: null } },
      attributes: ["id", "accountId"],
    });
    const ocupados = new Map(empresas.map((e) => [e.accountId, e.id]));
    const idEditando = empresaId ? parseInt(empresaId, 10) : null;

    const disponibles = accounts.filter((acc) => {
      const empId = ocupados.get(acc.id);
      return !empId || empId === idEditando;
    });

    res.json(disponibles);
  } catch (error) {
    console.error("Error getAccountsParaVincularEmpresa:", error);
    res.status(500).json({ message: error.message });
  }
};

// ========== OFERTAS (Empresa o Admin) ==========
// Admin: ve TODAS las ofertas (de todas las empresas). Opcional filtrar por empresaId.
// Empresa: solo ofertas de su empresa (usuario debe estar vinculado).
export const getMisOfertas = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    const empresa = await Empresa.findOne({ where: { accountId } });

    let where = {};
    if (esAdmin) {
      const { empresaId } = req.query;
      if (empresaId) where.empresaId = empresaId;
      // Sin filtro = todas las ofertas de todas las empresas
    } else {
      if (!empresa) return res.status(404).json({ message: "Primero complete su perfil de empresa o contacte al administrador para vincular su usuario." });
      where.empresaId = empresa.id;
    }

    const ofertas = await OfertaLaboral.findAll({
      where,
      include: [
        { model: Empresa, as: "empresa", attributes: ["id", "razonSocial", "sector"] },
        { model: Careers, as: "career", attributes: ["idCareer", "name"] },
        { model: Postulacion, as: "postulacions", attributes: ["id", "estado"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(ofertas);
  } catch (error) {
    console.error("Error getMisOfertas:", error);
    res.status(500).json({ message: error.message });
  }
};

export const crearOferta = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    const empresa = await Empresa.findOne({ where: { accountId } });

    let empresaId;
    if (esAdmin && req.body.empresaId) {
      const emp = await Empresa.findByPk(req.body.empresaId);
      if (!emp) return res.status(400).json({ message: "Empresa no encontrada" });
      empresaId = emp.id;
    } else if (empresa) {
      empresaId = empresa.id;
    } else {
      return res.status(404).json({ message: "Primero complete su perfil de empresa o seleccione una empresa (admin)" });
    }

    const { empresaId: _, ...restBody } = req.body;
    const oferta = await OfertaLaboral.create({
      ...restBody,
      empresaId,
      estado: "publicada",
    });

    res.status(201).json(oferta);

    // Notificar en segundo plano (no bloquear la respuesta)
    const ofertaId = oferta.id;
    const tituloOferta = oferta.titulo;
    const empresaIdOferta = empresaId;
    setImmediate(async () => {
      try {
        const empresa = await Empresa.findByPk(empresaIdOferta, { attributes: ["razonSocial", "logo"] });
        const nombreEmpresa = empresa?.razonSocial || "Empresa";
        const logoEmpresa = empresa?.logo || null;

        const rolesPostular = await Roles.findAll({
          where: { name: { [Op.in]: ROLES_PUEDEN_POSTULAR } },
          attributes: ["id"],
        });
        const roleIds = rolesPostular.map((r) => r.id);
        const accounts = await Account.findAll({
          include: [{
            model: Roles,
            as: "roles",
            where: { id: { [Op.in]: roleIds } },
            through: { attributes: [] },
            required: true,
          }],
          attributes: ["userId"],
        });
        const userIds = [...new Set(accounts.map((a) => a.userId).filter(Boolean))];
        const payload = {
          type: "info",
          title: tituloOferta ? `Nueva oferta: ${tituloOferta}` : "Nueva oferta laboral",
          message: nombreEmpresa,
          link: `/bolsa-empleo/oferta/${ofertaId}`,
          imageUrl: logoEmpresa,
        };
        for (const userId of userIds) {
          await Notifications.create({ userId, accountId: null, ...payload });
          sendNotificationToUser(userId, { ...payload, seen: false });
        }
      } catch (err) {
        console.error("Error al notificar oferta:", err);
      }
    });
  } catch (error) {
    console.error("Error crearOferta:", error);
    res.status(500).json({ message: error.message });
  }
};

export const actualizarOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    const empresa = await Empresa.findOne({ where: { accountId } });

    const where = esAdmin ? { id } : { id, empresaId: empresa?.id };
    const oferta = await OfertaLaboral.findOne({ where });
    if (!oferta) return res.status(404).json({ message: "Oferta no encontrada" });

    const { empresaId: _e, ...restBody } = req.body;
    await oferta.update(restBody);
    res.json(oferta);
  } catch (error) {
    console.error("Error actualizarOferta:", error);
    res.status(500).json({ message: error.message });
  }
};

export const cambiarEstadoOferta = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    const empresa = await Empresa.findOne({ where: { accountId } });

    const where = esAdmin ? { id } : { id, empresaId: empresa?.id };
    const oferta = await OfertaLaboral.findOne({ where });
    if (!oferta) return res.status(404).json({ message: "Oferta no encontrada" });

    await oferta.update({ estado: estado || "cerrada" });
    res.json(oferta);
  } catch (error) {
    console.error("Error cambiarEstadoOferta:", error);
    res.status(500).json({ message: error.message });
  }
};

// ========== OFERTAS (Público / Graduados) ==========
export const getOfertasPublicas = async (req, res) => {
  try {
    const { modalidad, idCareer } = req.query;
    const where = { estado: "publicada" };
    if (modalidad) where.modalidad = modalidad;
    if (idCareer) where.idCareer = idCareer;

    const ofertas = await OfertaLaboral.findAll({
      where,
      include: [
        { model: Empresa, as: "empresa", attributes: ["id", "razonSocial", "sector", "logo"] },
        { model: Careers, as: "career", attributes: ["idCareer", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(ofertas);
  } catch (error) {
    console.error("Error getOfertasPublicas:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getOfertaById = async (req, res) => {
  try {
    const { id } = req.params;
    const oferta = await OfertaLaboral.findOne({
      where: { id, estado: "publicada" },
      include: [
        { model: Empresa, as: "empresa", attributes: ["id", "razonSocial", "sector", "descripcion", "logo", "email", "telefono", "telefonoFijo", "telefonoMovil"] },
        { model: Careers, as: "career", attributes: ["idCareer", "name"] },
      ],
    });
    if (!oferta) return res.status(404).json({ message: "Oferta no encontrada" });
    res.json(oferta);
  } catch (error) {
    console.error("Error getOfertaById:", error);
    res.status(500).json({ message: error.message });
  }
};

// ========== POSTULARSE ==========
export const postularse = async (req, res) => {
  try {
    const accountId = req.user?.accountId;
    const userId = req.user?.userId;
    if (!accountId || !userId) return res.status(401).json({ message: "No autenticado" });

    const puede = await userCanPostular(accountId);
    if (!puede) return res.status(403).json({ message: "Solo graduados/egresados/estudiantes pueden postularse" });

    const { id } = req.params;
    const { mensajePresentacion } = req.body || {};

    const oferta = await OfertaLaboral.findOne({ where: { id, estado: "publicada" } });
    if (!oferta) return res.status(404).json({ message: "Oferta no encontrada o cerrada" });

    const professional = await Professionals.findOne({ where: { idUser: userId } });
    if (!professional) return res.status(400).json({ message: "Debe tener un CV/Perfil profesional para postularse" });

    const yaPostulado = await Postulacion.findOne({ where: { ofertaId: id, userId } });
    if (yaPostulado) return res.status(400).json({ message: "Ya se postuló a esta oferta" });

    const postulacion = await Postulacion.create({
      ofertaId: id,
      userId,
      professionalId: professional.id,
      mensajePresentacion: mensajePresentacion || null,
      estado: "postulado",
    });
    res.status(201).json(postulacion);
  } catch (error) {
    console.error("Error postularse:", error);
    res.status(500).json({ message: error.message });
  }
};

// ========== POSTULANTES (Empresa o Admin) ==========
// Admin: ve postulantes de CUALQUIER oferta.
// Empresa: solo si su usuario está vinculado (accountId) a la empresa que creó la oferta.
export const getPostulantes = async (req, res) => {
  try {
    const { id } = req.params;
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    const empresa = await Empresa.findOne({ where: { accountId } });

    if (!esAdmin) {
      if (!empresa) {
        return res.status(403).json({
          message: "Su usuario debe estar vinculado a una empresa para ver postulantes. Contacte al administrador.",
        });
      }
    }

    const whereOferta = esAdmin ? { id } : { id, empresaId: empresa.id };
    const oferta = await OfertaLaboral.findOne({ where: whereOferta });
    if (!oferta) return res.status(404).json({ message: "Oferta no encontrada" });

    const postulaciones = await Postulacion.findAll({
      where: { ofertaId: id },
      include: [
        { model: Users, as: "user", attributes: ["id", "firstName", "secondName", "firstLastName", "secondLastName", "ci", "photo"] },
        { model: Professionals, as: "professional", attributes: ["id", "summary", "personalEmail", "institutionalEmail", "professionalTitle"] },
        {
          model: OfertaLaboral,
          as: "ofertaLaboral",
          attributes: ["id", "titulo", "empresaId"],
          include: [{ model: Empresa, as: "empresa", attributes: ["id", "razonSocial"] }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(postulaciones);
  } catch (error) {
    console.error("Error getPostulantes:", error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: puede actualizar cualquier postulación.
// Empresa: solo si su usuario está vinculado a la empresa de la oferta.
export const actualizarEstadoPostulacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, notasEmpresa } = req.body;
    const accountId = req.user?.accountId;
    if (!accountId) return res.status(401).json({ message: "No autenticado" });

    const esAdmin = await userIsAdmin(accountId);
    const empresa = await Empresa.findOne({ where: { accountId } });

    if (!esAdmin && !empresa) {
      return res.status(403).json({
        message: "Su usuario debe estar vinculado a una empresa para gestionar postulaciones.",
      });
    }

    const postulacion = await Postulacion.findByPk(id, {
      include: [{ model: OfertaLaboral, as: "ofertaLaboral" }],
    });
    if (!postulacion) return res.status(404).json({ message: "Postulación no encontrada" });
    if (!esAdmin && postulacion.ofertaLaboral?.empresaId !== empresa.id) {
      return res.status(403).json({ message: "No puede modificar postulaciones de ofertas de otras empresas." });
    }

    const updateData = {};
    if (estado) updateData.estado = estado;
    if (notasEmpresa !== undefined) updateData.notasEmpresa = notasEmpresa;
    await postulacion.update(updateData);
    res.json(postulacion);
  } catch (error) {
    console.error("Error actualizarEstadoPostulacion:", error);
    res.status(500).json({ message: error.message });
  }
};

// ========== MIS POSTULACIONES (Graduado) ==========
export const getMisPostulaciones = async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "No autenticado" });

    const postulaciones = await Postulacion.findAll({
      where: { userId },
      include: [
        {
          model: OfertaLaboral,
          as: "ofertaLaboral",
          include: [{ model: Empresa, as: "empresa", attributes: ["id", "razonSocial"] }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(postulaciones);
  } catch (error) {
    console.error("Error getMisPostulaciones:", error);
    res.status(500).json({ message: error.message });
  }
};

// ========== CARRERAS (para filtros) ==========
export const getCareersForBolsa = async (req, res) => {
  try {
    const careers = await Careers.findAll({ order: [["name", "ASC"]] });
    res.json(careers);
  } catch (error) {
    console.error("Error getCareersForBolsa:", error);
    res.status(500).json({ message: error.message });
  }
};
