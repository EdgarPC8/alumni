import { NotificationProgram } from "../models/NotificationProgram.js";
import { Notifications } from "../models/Notifications.js";
import { Account } from "../models/Account.js";
import { Roles } from "../models/Roles.js";
import { Users } from "../models/Users.js";
import { sendNotificationToUser } from "../sockets/notificationSocket.js";
import { Op } from "sequelize";

async function getTargetUserIds(targetType, targetRoleIds) {
  if (targetType === "all_users") {
    const users = await Users.findAll({ attributes: ["id"] });
    return users.map((u) => u.id);
  }
  if (targetType === "by_role" && targetRoleIds?.length) {
    const accounts = await Account.findAll({
      include: [{
        model: Roles,
        as: "roles",
        where: { id: { [Op.in]: targetRoleIds } },
        through: { attributes: [] },
        required: true,
      }],
      attributes: ["userId"],
    });
    return [...new Set(accounts.map((a) => a.userId).filter(Boolean))];
  }
  return [];
}

export function startNotificationScheduler() {
  setInterval(async () => {
    try {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const timeStr = `${h}:${m}`;

      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const programs = await NotificationProgram.findAll({
        where: {
          active: true,
          scheduleType: "daily",
          scheduleTime: timeStr,
          [Op.or]: [
            { lastSentAt: null },
            { lastSentAt: { [Op.lt]: startOfToday } },
          ],
        },
      });

      for (const prog of programs) {
        const userIds = await getTargetUserIds(prog.targetType, prog.targetRoleIds);
        const payload = { type: "info", title: prog.title, message: prog.message, link: prog.link || null };
        for (const userId of userIds) {
          await Notifications.create({ userId, accountId: null, ...payload });
          sendNotificationToUser(userId, { ...payload, seen: false });
        }
        await prog.update({ lastSentAt: new Date() });
        console.log(`📬 Notificación programada "${prog.code}" enviada a ${userIds.length} usuarios`);
      }
    } catch (err) {
      console.error("Error en scheduler de notificaciones:", err);
    }
  }, 60000);
}
