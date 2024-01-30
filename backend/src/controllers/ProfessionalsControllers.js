import { Professionals } from "../Models/Professionals.js";
import { logger } from "../log/LogActivity.js";

const getAllProfessionals = async (req, res) => {
  const professionals = await Professionals.findAll();
  res.json(professionals);
};

const addProfessional = async (req, res) => {
  const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
  try {
    const newProfessional = await Professionals.create(data);
    res.json({ message: "Agregado con éxito" });
    // logger({
    //   httpMethod: req.method,
    //   endPoint: req.originalUrl,
    //   action: `Se agregó un profesional ${newProfessional.ci} ${newProfessional.firstName} ${newProfessional.firstLastName}`,
    // });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const editProfessional = async (req, res) => {
  const data = req.body;
  const profesional=req.params;
  try {
    const editProfessional = await Professionals.update(data, {
      where: {
        id: profesional.professionalId,
      },
    });
    res.json({ message: "Profesional Editado con éxito" });
  //   logger({
  //     httpMethod: req.method,
  //     endPoint: req.originalUrl,
  //     action: "Se editó un profesional",
  //     description:`El Usuario ah Editado al Profesional ${data.firstName} ${data.firstLastName}`
  // })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfessionalsById = async (req, res) => {
  try {
    const professional = await Professionals.findOne({
      where: {
        id: req.params.userId,
      },
    });
    res.json(professional);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  getAllProfessionals,
  addProfessional,
  editProfessional,
  getProfessionalsById,
};
