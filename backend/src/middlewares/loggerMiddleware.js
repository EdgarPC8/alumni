// loggerMiddleware.js
import { logger } from '../log/LogActivity.js';


const methodsToFilter = ['GET','OPTIONS'];




const loggerMiddleware = (req, res, next) => {
  const user = req.user; // Información del usuario autenticado

  // Filtrar solicitudes según el array methodsToFilter
  if (!methodsToFilter.includes(req.method)) {
    
    logger({
      httpMethod: req.method,
      endPoint: req.originalUrl,
      action: 'Interceptando solicitud en rutas de usuario',
      description: user ? { userId: user.userId, username: user.username } : null,
    });
  }

  next();
};

  
  

export default loggerMiddleware;
