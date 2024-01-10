import { Logger } from "../Models/Logging.js";

const getLogs = async (req, res) => {
  try {
    const logs = await Logger.findAll();

    res.json(logs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getLogs };
