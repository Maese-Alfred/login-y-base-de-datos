import db from "../config/db.js";
const sql = db;

export const createClient = async ({ nombre, apellido, telefono, correo }) => {
  try {
      const result = await db.query(
          "INSERT INTO clientes (nombre, apellido, telefono, correo) VALUES ($1, $2, $3, $4) RETURNING *",
          [nombre, apellido, telefono, correo]
      );
      return result.rows[0];
  } catch (error) {
      console.error("Error creating client:", error);
      throw error;
  }
};

// Obtener todos los clientes
export const getAllClients = async () => {
  try {
      const result = await db.query("SELECT * FROM clientes");
      return result.rows;
  } catch (error) {
      console.error("Error fetching clients:", error);
      throw error;
  }
};

// Obtener cliente por ID
export const getClientById = async (id) => {
  try {
      const result = await db.query("SELECT * FROM clientes WHERE id = $1", [id]);
      return result.rows[0];
  } catch (error) {
      console.error("Error fetching client by ID:", error);
      throw error;
  }
};

// Actualizar cliente
export const updateClient = async (id, { nombre, apellido, telefono, correo }) => {
  try {
      const result = await db.query(
          "UPDATE clientes SET nombre = $1, apellido = $2, telefono = $3, correo = $4 WHERE id = $5 RETURNING *",
          [nombre, apellido, telefono, correo, id]
      );
      return result.rows[0];
  } catch (error) {
      console.error("Error updating client:", error);
      throw error;
  }
};

// Eliminar cliente
export const deleteClient = async (id) => {
  try {
      const result = await db.query(
          "DELETE FROM clientes WHERE id = $1 RETURNING *",
          [id]
      );
      return result.rows[0];
  } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
  }
};