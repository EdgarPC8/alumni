import { Logger } from "../Models/Logging.js";

const logger = ({ httpMethod, endPoint, action,description,system }) => {
  try {
    const createLog = Logger.create({ httpMethod, endPoint, action,description,system });
  } catch (error) {
    console.log("ocurrio un error", error);
  }
};

export { logger };
