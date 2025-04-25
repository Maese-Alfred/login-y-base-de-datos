import db from "../config/db.js";
const sql = db;

export const createBookingStatus = async ({ descripcion }) => {
    try {
        const result = await db.query(
            `INSERT INTO estadosreservas (descripcion) VALUES ($1) RETURNING *`,
            [descripcion]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating booking status:", error);
        throw error;
    }
};

// Obtener todos los estados de reserva
export const getAllBookingStatus = async () => {
    try {
        const result = await db.query(`SELECT * FROM estadosreservas`);
        return result.rows;
    } catch (error) {
        console.error("Error fetching booking status:", error);
        throw error;
    }
};

// Obtener estado de reserva por ID
export const getBookingStatusById = async (id) => {
    try {
        const result = await db.query("SELECT * FROM estadosreservas WHERE id = $1", [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching booking status by ID:", error);
        throw error;
    }
};

// Obtener estado de reserva por descripción
export const getBookingStatusByDescription = async (descripcion) => {
    try {
        const result = await db.query(
            "SELECT * FROM estadosreservas WHERE descripcion = $1",
            [descripcion]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching booking status by description:", error);
        throw error;
    }
};

// Actualizar estado de reserva
export const updateBookingStatus = async (id, { descripcion }) => {
    try {
        const result = await db.query(
            `UPDATE estadosreservas SET descripcion = $1 WHERE id = $2 RETURNING *`,
            [descripcion, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating booking status:", error);
        throw error;
    }
};

// Eliminar estado de reserva
export const deleteBookingStatus = async (id) => {
    try {
        const result = await db.query(
            "DELETE FROM estadosreservas WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting booking status:", error);
        throw error;
    }
};