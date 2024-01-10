import { Logger } from "../Models/Logging.js";

const logger = ({ httpMethod, endPoint, action }) => {
  try {
    const createLog = Logger.create({ httpMethod, endPoint, action });
  } catch (error) {
    console.log("ocurrio un error", error);
  }
};

export { logger };
