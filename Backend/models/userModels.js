import db from "../config/db.js";
const sql = db;

export const getAllUsers = async () => {
  try {
    const result = await db.query("SELECT * FROM usuarios");
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export const getUserById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}

export const getUserByUID = async (uid) => {
  const result = await sql`
    SELECT * FROM usuarios WHERE uid_firebase = ${uid}
  `;
  return result[0];
};

export const createUser = async (user) => {
  const {id, uid_firebase,usuario, rol} = user;
  try {
    const result = await db.query(
      "INSERT INTO usuarios (uid_firebase, usuario, rol) VALUES ($1, $2, $3) RETURNING *",
      [uid_firebase, usuario, rol]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export const updateUser = async (id, user) => {
  const {uid_firebase, usuario, rol} = user;
  try {
    const result = await db.query(
      "UPDATE usuarios SET uid_firebase = $1, usuario = $2, rol = $3 WHERE id = $4 RETURNING *",
      [uid_firebase, usuario, rol, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export const deleteUser = async (id) => {
  try {
    const result = await db.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export const getUserRole = async (uid) => {
  try {
    const result = await db.query("SELECT rol FROM usuarios WHERE uid_firebase = $1", [uid]);
    return result.rows[0]?.rol ?? null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}

