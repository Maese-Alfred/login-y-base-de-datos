import db from "../config/db.js";
const sql = db;

export const createActivity = async (activity) => {
    try {
        const { usuarioid, accionRealizada, fechayHora } = activity;
        const result = await db.query(
            `INSERT INTO historialactividades (usuarioid, accionrealizada, fechahora)
             VALUES ($1, $2, $3) RETURNING *`,
            [usuarioid, accionRealizada, fechayHora]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating activity:", error);
        throw error;
    }
};

// Obtener todas las actividades con info del usuario
export const getAllActivities = async () => {
    try {
        const result = await db.query(`
            SELECT ha.*, u.nombre AS nombre_usuario, u.correo 
            FROM historialactividades ha
            JOIN usuarios u ON ha.usuarioid = u.id
        `);
        return result.rows;
    } catch (error) {
        console.error("Error fetching activities:", error);
        throw error;
    }
};

// Obtener actividades por ID de usuario
export const getAllActivitiesByUser = async (userid) => {
    try {
        const result = await db.query(`
            SELECT ha.*, u.nombre AS nombre_usuario 
            FROM historialactividades ha
            JOIN usuarios u ON ha.usuarioid = u.id
            WHERE ha.usuarioid = $1
        `, [userid]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching activities by user:", error);
        throw error;
    }
};

// Obtener una actividad por su ID
export const getActivityById = async (id) => {
    try {
        const result = await db.query(
            "SELECT * FROM historialactividades WHERE id = $1",
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching activity by ID:", error);
        throw error;
    }
};

// Actualizar una actividad
export const updateActivity = async (id, activity) => {
    const { accionRealizada, fechayHora } = activity;
    try {
        const result = await db.query(
            `UPDATE historialactividades 
             SET accionrealizada = $1, fechahora = $2 
             WHERE id = $3 RETURNING *`,
            [accionRealizada, fechayHora, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating activity:", error);
        throw error;
    }
};

// Eliminar una actividad
export const deleteActivity = async (id) => {
    try {
        const result = await db.query(
            "DELETE FROM historialactividades WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting activity:", error);
        throw error;
    }
};