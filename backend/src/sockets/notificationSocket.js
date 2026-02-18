let io;

export const initNotificationSocket = (ioServer) => {
  io = ioServer;
  io.on("connection", (socket) => {
    console.log("🔔 Cliente conectado al canal de notificaciones");
    socket.on("join", ({ userId, accountId }) => {
      if (userId) {
        socket.join(`user_${userId}`);
      }
      if (accountId) {
        socket.join(`account_${accountId}`);
      }
    });
    socket.on("disconnect", () => {
      console.log("🔕 Cliente desconectado");
    });
  });
};

/** Notificación por cuenta (ej. encuesta asignada) */
export const sendNotificationToAccount = (accountId, notification) => {
  if (io && accountId) {
    io.to(`account_${accountId}`).emit("newNotification", notification);
  }
};

/** Notificación por usuario (ej. buenos días) - visible en todas sus cuentas */
export const sendNotificationToUser = (userId, notification) => {
  if (io && userId) {
    io.to(`user_${userId}`).emit("newNotification", notification);
  }
};
