import { Notifications } from "../Models/Notifications.js";


export const getAllNoti = async (req, res) => {
  const data = await Notifications.findAll();
  res.json(data);
};
