import db from "../config/db.js";
const sql =db

export const getAllKindUser = async () => {
  const result = await db.query("SELECT * FROM TiposDeUsuarios");
  return result.rows;
};

export const getKindUserById = async (id) => {
  const result = await db.query("SELECT * FROM TiposDeUsuarios WHERE id = $1", [id]);
  return result.rows[0];
};

export const createKindUser = async (descripcion) => {
  const result = await db.query(
    "INSERT INTO TiposDeUsuarios (descripcion) VALUES ($1) RETURNING *",
    [descripcion]
  );
  return result.rows[0];
};

export const updateKindUser = async (id, descripcion) => {
  const result = await db.query(
    "UPDATE TiposDeUsuarios SET descripcion = $1 WHERE id = $2 RETURNING *",
    [descripcion, id]
  );
  return result.rows[0];
};

export const deleteKindUser = async (id) => {
  const result = await db.query("DELETE FROM TiposDeUsuarios WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

export const getKindUserByDescription = async (descripcion) => {
  const result = await db.query("SELECT * FROM TiposDeUsuarios WHERE descripcion = $1", [descripcion]);
  return result.rows[0];
}