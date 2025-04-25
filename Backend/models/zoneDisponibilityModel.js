import db from "../config/db.js";
const sql = db;

export const createZoneDisponibility = async (disponibilidadZona) => {
    const { zonaid, fecha, horainicio, horafin, disponible } = disponibilidadZona;

    // Validar que las fechas y horas sean coherentes
    if (new Date(horainicio) >= new Date(horafin)) {
        throw new Error("La hora de inicio no puede ser mayor o igual a la hora de fin.");
    }

    try {
        const result = await sql.query(`
            INSERT INTO disponibilidadzona (zonaid, fecha, horainicio, horafin, disponible)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [zonaid, fecha, horainicio, horafin, disponible]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating zone disponibility:", error);
        throw error;
    }
}

// Obtener disponibilidad con zona, ahora considerando el filtro por ID de zona
export const getDisponibilitywithZone = async (id) => {
    try {
        const result = await sql.query(`
            SELECT dz.*, z.nombre AS nombre_zona
            FROM disponibilidadzona dz
            JOIN zonascampotiro z ON dz.zonaid = z.id
            WHERE dz.zonaid = $1`, [id]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching zone disponibility:", error);
        throw error;
    }
}

// Obtener disponibilidad por fecha
export const getDisponibilityByDate = async (fecha, limit = 10, offset = 0) => {
    try {
        const result = await sql.query(`
            SELECT dz.*, z.nombre AS nombre_zona
            FROM disponibilidadzona dz
            JOIN zonascampotiro z ON dz.zonaid = z.id
            WHERE dz.fecha = $1
            LIMIT $2 OFFSET $3`, [fecha, limit, offset]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching zone disponibility by date:", error);
        throw error;
    }
}

// Obtener disponibilidad por ID de zona
export const getDisponibilityByZoneId = async (id) => {
    try {
        const result = await sql.query(`
            SELECT * FROM disponibilidadzona
            WHERE zonaid = $1`, [id]);
        if (result.rows.length === 0) {
            throw new Error("No se encontró disponibilidad para esta zona.");
        }
        return result.rows;
    } catch (error) {
        console.error("Error fetching zone disponibility by ID:", error);
        throw error;
    }
}

// Actualizar disponibilidad de zona con validación
export const updateZoneDisponibility = async (id, disponibilidadZona) => {
    const { zonaid, fecha, horainicio, horafin, disponible } = disponibilidadZona;

    // Validar la coherencia de las horas
    if (new Date(horainicio) >= new Date(horafin)) {
        throw new Error("La hora de inicio no puede ser mayor o igual a la hora de fin.");
    }

    try {
        const result = await sql.query(
            `UPDATE disponibilidadzona
            SET zonaid = $1, fecha = $2, horainicio = $3, horafin = $4, disponible = $5
            WHERE id = $6 RETURNING *`,
            [zonaid, fecha, horainicio, horafin, disponible, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating zone disponibility:", error);
        throw error;
    }
}

// Eliminar disponibilidad de zona con validación
export const deleteZoneDisponibility = async (id) => {
    try {
        const result = await sql.query("DELETE FROM disponibilidadzona WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            throw new Error("No se encontró disponibilidad para eliminar.");
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting zone disponibility:", error);
        throw error;
    }
}

