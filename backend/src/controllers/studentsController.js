import { Students } from "../Models/Students.js";


export const getStudents = async (req, res) => {
  try {
    const data = await Students.findAll();
    console.log("Cantidad de los estudiantes--------------------------------------------------------------------------------")
    // console.log(data.lenght)
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Hubo un problema al obtener los datos de los estudiantes." });
  }
};

export const getAllStudents = async (req, res) => {
    try {
      const data = await Students.findAll();

      res.json(data);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Hubo un problema al obtener los datos de los estudiantes." });
    }
  };

