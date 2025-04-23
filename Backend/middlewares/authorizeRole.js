import { getUserRole } from '../models/userModels.js'; // Asegúrate de tener este método en tu modelo

// Middleware para verificar roles
export const authorizeRole = (roles) => {
  return async (req, res, next) => {
    const { uid } = req.user; // Obtener el UID del usuario desde el token

    try {
      const userRole = await getUserRole(uid); // Obtener el rol del usuario desde la base de datos

      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
      }

      next(); // Si el rol es válido, llama al siguiente middleware o ruta
    } catch (error) {
      console.error("Error verifying user role:", error);
      res.status(500).json({ message: "Error verifying user role" });
    }
  };
};