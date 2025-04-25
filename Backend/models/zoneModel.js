import db from "../config/db.js";
const sql = db;

export const createZone = async (zone) => {
    const { nombre, descripcion } = zone;

    // Validación básica
    if (!nombre || !descripcion) {
        throw new Error("El nombre y la descripción son obligatorios.");
    }

    try {
        const result = await db.query(
            `INSERT INTO zonascampotiro (nombre, descripcion)
            VALUES ($1, $2)
            RETURNING *`,
            [nombre, descripcion]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating zone:", error);
        throw error;
    }
}

// Obtener zonas con su configuración
export const getZonesWithConfiguration = async () => {
    try {
        const result = await db.query(`
            SELECT z.*, cz.capacidad, cz.fechadesde, cz.fechahasta
            FROM zonascampotiro z
            LEFT JOIN configuracionzona cz ON z.id = cz.zonaid
        `);
        return result.rows;
    } catch (error) {
        console.error("Error fetching zones with configuration:", error);
        throw error;
    }
}

// Obtener zonas con disponibilidad para una fecha específica
export const getZonesDisponibilityByDate = async (fecha) => {
    if (!fecha) {
        throw new Error("La fecha es obligatoria.");
    }

    try {
        const result = await db.query(`
            SELECT z.*, dz.fecha, dz.horainicio, dz.horafin, dz.disponible
            FROM zonascampotiro z
            JOIN disponibilidadzona dz ON z.id = dz.zonaid
            WHERE dz.fecha = $1`,
            [fecha]
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching zones with availability:", error);
        throw error;
    }
}

// Obtener zonas con reservas en una fecha específica
export const getZonesWithBooking = async (fecha) => {
    if (!fecha) {
        throw new Error("La fecha es obligatoria.");
    }

    try {
        const result = await db.query(`
            SELECT z.*, r.fecha, r.hora, r.montopagado
            FROM zonascampotiro z
            JOIN reservas r ON z.id = r.zonacampotroid
            WHERE r.fecha = $1`,
            [fecha]
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching zones with booking:", error);
        throw error;
    }
}

// Obtener todas las zonas
export const getAllZones = async () => {
    try {
        const result = await db.query("SELECT * FROM zonascampotiro");
        return result.rows;
    } catch (error) {
        console.error("Error fetching all zones:", error);
        throw error;
    }
}

// Obtener zona por ID
export const getZoneById = async (id) => {
    try {
        const result = await db.query("SELECT * FROM zonascampotiro WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Zona no encontrada.");
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching zone by ID:", error);
        throw error;
    }
}

// Actualizar zona
export const updateZone = async (id, zone) => {
    const { nombre, descripcion } = zone;

    // Validación básica
    if (!nombre || !descripcion) {
        throw new Error("El nombre y la descripción son obligatorios.");
    }

    try {
        const result = await db.query(
            `UPDATE zonascampotiro
            SET nombre = $1, descripcion = $2
            WHERE id = $3 RETURNING *`,
            [nombre, descripcion, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating zone:", error);
        throw error;
    }
}

// Eliminar zona
export const deleteZone = async (id) => {
    try {
        const result = await db.query("DELETE FROM zonascampotiro WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            throw new Error("Zona no encontrada para eliminar.");
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting zone:", error);
        throw error;
    }
}

    