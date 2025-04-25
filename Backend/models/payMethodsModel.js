import db from "../config/db.js";
const sql =db

export const createPayMethod = async ({ tipo }) => {
    try {
        const result = await sql.query(
            "INSERT INTO metodosdepago (tipo) VALUES ($1) RETURNING *",
            [tipo]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating pay method:", error);
        throw error;
    }
};

// Obtener todos los métodos de pago
export const getAllPayMethods = async () => {
    try {
        const result = await sql.query("SELECT * FROM metodosdepago");
        return result.rows;
    } catch (error) {
        console.error("Error fetching pay methods:", error);
        throw error;
    }
};

// Obtener método de pago por ID
export const getPayMethodById = async (id) => {
    try {
        const result = await sql.query("SELECT * FROM metodosdepago WHERE id = $1", [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching pay method by ID:", error);
        throw error;
    }
};

// Actualizar método de pago
export const updatePayMethod = async (id, { tipo }) => {
    try {
        const result = await sql.query(
            "UPDATE metodosdepago SET tipo = $1 WHERE id = $2 RETURNING *",
            [tipo, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating pay method:", error);
        throw error;
    }
};

// Eliminar método de pago
export const deletePayMethod = async (id) => {
    try {
        const result = await sql.query(
            "DELETE FROM metodosdepago WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting pay method:", error);
        throw error;
    }
};