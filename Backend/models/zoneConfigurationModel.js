import db from "../config/db.js";
const sql = db;

export const createZoneConfiguration = async (zoneConfiguration) => {
    const { capacidad, fechaDesde, fechaHasta } = zoneConfiguration;
    
    // Validar la capacidad (número positivo)
    if (capacidad <= 0) {
        throw new Error("La capacidad debe ser un número positivo.");
    }

    // Validar las fechas
    if (new Date(fechaDesde) > new Date(fechaHasta)) {
        throw new Error("La fecha de inicio no puede ser mayor que la fecha de fin.");
    }

    try {
        const result = await db.query(
            `INSERT INTO configuracionZona (capacidad, fechaDesde, fechaHasta) 
             VALUES ($1, $2, $3) RETURNING *`,
            [capacidad, fechaDesde, fechaHasta]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating zone configuration:", error);
        throw error;
    }
}

// Obtener todas las configuraciones de zona con paginación
export const getAllZoneConfigurations = async (limit = 10, offset = 0) => {
    try {
        const result = await db.query(
            `SELECT cz.*, z.nombre AS nombre_zona, z.capacidad AS capacidad_zona
            FROM configuracion_zona cz
            JOIN zonascampotiro z ON cz.zonaid = z.id
            LIMIT $1 OFFSET $2`,
            [limit, offset]
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching zone configurations:", error);
        throw error;
    }
};

// Obtener configuración de zona por ID con manejo de error si no existe
export const getZoneConfigurationById = async (id) => {
    try {
        const result = await db.query(
            `SELECT cz.*, z.nombre AS nombre_zona
            FROM configuracionZona cz
            JOIN zonascampotiro z ON cz.zonaid = z.id
            WHERE cz.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            throw new Error("Configuración de zona no encontrada.");
        }

        return result.rows[0];
    } catch (error) {
        console.error("Error fetching zone configuration by ID:", error);
        throw error;
    }
};

// Actualizar configuración de zona con validación
export const updateZoneConfiguration = async (id, zoneConfiguration) => {
    const { capacidad, fechaDesde, fechaHasta } = zoneConfiguration;

    // Validación de la capacidad
    if (capacidad <= 0) {
        throw new Error("La capacidad debe ser un número positivo.");
    }

    // Validación de fechas
    if (new Date(fechaDesde) > new Date(fechaHasta)) {
        throw new Error("La fecha de inicio no puede ser mayor que la fecha de fin.");
    }

    try {
        const result = await db.query(
            `UPDATE configuracionZona 
             SET capacidad = $1, fechaDesde = $2, fechaHasta = $3 
             WHERE id = $4 RETURNING *`,
            [capacidad, fechaDesde, fechaHasta, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating zone configuration:", error);
        throw error;
    }
}

// Eliminar configuración de zona
export const deleteZoneConfiguration = async (id) => {
    try {
        const result = await db.query("DELETE FROM configuracionZona WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            throw new Error("Configuración de zona no encontrada para eliminar.");
        }
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting zone configuration:", error);
        throw error;
    }
}