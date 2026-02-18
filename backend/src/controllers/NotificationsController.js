import { Notifications } from "../models/Notifications.js";
import { Op } from "sequelize";

function buildNotificationWhere(accountId, userId) {
  const or = [];
  if (accountId) or.push({ accountId });
  if (userId) or.push({ userId, accountId: null });
  if (or.length === 0) return { deleted: false, id: -1 };
  return { deleted: false, [Op.or]: or };
}

export const getUnreadCountByAccount = async (req, res) => {
  const { accountId, userId } = req.user || {};
  if (!accountId && !userId) return res.status(401).json({ message: "No autenticado" });
  try {
    const count = await Notifications.count({
      where: {
        ...buildNotificationWhere(accountId, userId),
        seen: false,
      },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNotificationsByAccount = async (req, res) => {
  const { accountId, userId } = req.user || {};
  if (!accountId && !userId) return res.status(401).json({ message: "No autenticado" });
  try {
    const notifications = await Notifications.findAll({
      where: buildNotificationWhere(accountId, userId),
      order: [["createdAt", "DESC"]],
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  const { userId, accountId, type, title, message, link } = req.body;
  try {
    const notification = await Notifications.create({
      userId: userId || null,
      accountId: accountId || null,
      type,
      title,
      message,
      link,
    });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsSeen = async (req, res) => {
  const { id } = req.params;
  const { accountId, userId } = req.user || {};
  try {
    const notification = await Notifications.findByPk(id);
    if (!notification) return res.status(404).json({ message: "No encontrada" });
    if (notification.accountId && notification.accountId !== accountId) return res.status(403).json({ message: "No autorizado" });
    if (notification.userId && notification.accountId == null && notification.userId !== userId) return res.status(403).json({ message: "No autorizado" });
    notification.seen = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  const { accountId, userId } = req.user || {};
  try {
    const notification = await Notifications.findByPk(id);
    if (!notification) return res.status(404).json({ message: "No encontrada" });
    if (notification.accountId && notification.accountId !== accountId) return res.status(403).json({ message: "No autorizado" });
    if (notification.userId && notification.accountId == null && notification.userId !== userId) return res.status(403).json({ message: "No autorizado" });
    notification.deleted = true;
    await notification.save();
    res.json({ message: "Notificación marcada como eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

