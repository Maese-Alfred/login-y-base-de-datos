import db from "../config/db.js";
const sql = db;


// Crear una reserva
export const createBooking = async (booking) => {
    try {
        const { clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado } = booking;
        const result = await db.query(
            `INSERT INTO reservas (clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating booking:", error);
        throw error;
    }
};

// Obtener todas las reservas
export const getAllBookings = async () => {
    try {
        const result = await db.query(`
            SELECT r.*, 
                   c.nombre AS cliente, 
                   z.nombre AS zona, 
                   e.descripcion AS estado
            FROM reservas r
            JOIN clientes c ON r.clienteid = c.id
            JOIN zonascampotiro z ON r.zonacampotiroid = z.id
            JOIN estadosreserva e ON r.estadoreservaid = e.id
        `);
        return result.rows;
    } catch (error) {
        console.error("Error fetching bookings:", error);
        throw error;
    }
};

// Obtener reservas por cliente
export const getBookingByClientId = async (id) => {
    try {
        const result = await db.query(`
            SELECT r.*, 
                   z.nombre AS zona, 
                   e.descripcion AS estado
            FROM reservas r
            JOIN zonascampotiro z ON r.zonacampotiroid = z.id
            JOIN estadosreserva e ON r.estadoreservaid = e.id
            WHERE r.clienteid = $1
        `, [id]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching booking by client ID:", error);
        throw error;
    }
};

// Obtener reservas por zona y fecha
export const getBookingByZoneDate = async (zoneId, date) => {
    try {
        const result = await db.query(`
            SELECT * FROM reservas
            WHERE zonacampotiroid = $1 AND fecha = $2
        `, [zoneId, date]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching booking by zone and date:", error);
        throw error;
    }
};

// Obtener reserva por ID
export const getBookingById = async (id) => {
    try {
        const result = await db.query(`
            SELECT r.*, 
                   c.nombre AS cliente, 
                   z.nombre AS zona, 
                   e.descripcion AS estado
            FROM reservas r
            JOIN clientes c ON r.clienteid = c.id
            JOIN zonascampotiro z ON r.zonacampotiroid = z.id
            JOIN estadosreserva e ON r.estadoreservaid = e.id
            WHERE r.id = $1
        `, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        throw error;
    }
};

// Actualizar reserva
export const updateBooking = async (id, booking) => {
    const { clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado } = booking;
    try {
        const result = await db.query(
            `UPDATE reservas 
             SET clienteid = $1, fecha = $2, hora = $3, estadoreservaid = $4, zonacampotiroid = $5, montopagado = $6
             WHERE id = $7 RETURNING *`,
            [clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating booking:", error);
        throw error;
    }
};

// Eliminar reserva
export const deleteBooking = async (id) => {
    try {
        const result = await db.query("DELETE FROM reservas WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting booking:", error);
        throw error;
    }
};

