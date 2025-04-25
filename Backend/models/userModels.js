import db from "../config/db.js";
const sql = db;


// Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM usuarios");
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Obtener usuario por ID interno
export const getUserById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Obtener usuario por UID de Firebase
export const getUserByUID = async (uid) => {
  try {
    const result = await db.query("SELECT * FROM usuarios WHERE uid_firebase = $1", [uid]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by Firebase UID:", error);
    throw error;
  }
};

// Crear usuario nuevo
export const createUser = async (user) => {
  const { uid_firebase, nombre, correo, tipoUsuarioID } = user;
  try {
    const result = await db.query(
      `INSERT INTO usuarios (uid_firebase, nombre, correo, tipoUsuarioID)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [uid_firebase, nombre, correo, tipoUsuarioID]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Actualizar usuario
export const updateUser = async (id, user) => {
  const { uid_firebase, nombre, correo, tipoUsuarioID } = user;
  try {
    const result = await db.query(
      `UPDATE usuarios 
       SET uid_firebase = $1, nombre = $2, correo = $3, tipoUsuarioID = $4
       WHERE id = $5 RETURNING *`,
      [uid_firebase, nombre, correo, tipoUsuarioID, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (id) => {
  try {
    const result = await db.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

