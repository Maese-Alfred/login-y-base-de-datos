import admin from "../config/firebase.js";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid; // Ahora puedes usar el UID del usuario
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export default verifyToken;