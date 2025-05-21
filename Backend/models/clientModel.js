import db from "../config/db.js"; // db ya es una función de postgres.js

// Crear cliente
export const createClient = async ({ nombre, apellido, telefono, correo }) => {
  try {
    const result = await db`
      INSERT INTO clientes (nombre, apellido, telefono, correo)
      VALUES (${nombre}, ${apellido}, ${telefono}, ${correo})
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

// Obtener todos los clientes
export const getAllClients = async () => {
  try {
    const result = await db`SELECT * FROM clientes`;
    return result; // Ya es un array de objetos
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

// Obtener cliente por ID
export const getClientById = async (id) => {
  try {
    const result = await db`
      SELECT * FROM clientes WHERE id = ${id}
    `;
    return result[0];
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    throw error;
  }
};

// Actualizar cliente
export const updateClient = async (id, { nombre, apellido, telefono, correo }) => {
  try {
    const result = await db`
      UPDATE clientes
      SET nombre = ${nombre},
          apellido = ${apellido},
          telefono = ${telefono},
          correo = ${correo}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

// Eliminar cliente
export const deleteClient = async (id) => {
  try {
    const result = await db`
      DELETE FROM clientes
      WHERE id = ${id}
      RETURNING *;
    `;
    return result[0];
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};