import db from "../config/db.js";
const sql = db;

export const createSale = async (sale) => {
    try {
        const { clienteid, usuarioid, fecha, metodopagoid, total } = sale;
        const result = await db.query(
            `INSERT INTO ventas (clienteid, usuarioid, fecha, metodopagoid, total)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`, // Asegúrate de que las columnas sean correctas
            [clienteid, usuarioid, fecha, metodopagoid, total]
        );
        return result.rows[0]; // Retorna el primer resultado (solo un registro debería ser insertado)
    } catch (error) {
        console.error("Error creating sale:", error);
        throw error; // Se lanza el error para manejarlo en un nivel superior
    }
}

export const getAllSales = async () => {
    try {
        const result = await db.query(`
            SELECT v.*, 
                   c.nombre AS cliente_nombre,
                   u.nombre AS usuario_nombre,
                   m.tipo AS metodo_pago
            FROM ventas v
            JOIN clientes c ON v.clienteid = c.id
            JOIN usuarios u ON v.usuarioid = u.id
            JOIN metodosdepago m ON v.metodopagoid = m.id
        `); // Verifica que las relaciones entre tablas estén correctas
        return result.rows; // Retorna todas las filas obtenidas
    } catch (error) {
        console.error("Error fetching sales:", error);
        throw error; // Error que será manejado en una capa superior
    }
}

export const updateSale = async (id, sale) => {
    const { clienteid, usuarioid, fecha, metodopagoid, total } = sale;
    try {
        const result = await db.query(
            `UPDATE ventas 
             SET clienteid = $1, usuarioid = $2, fecha = $3, metodopagoid = $4, total = $5 
             WHERE id = $6 RETURNING *`, // Actualiza la venta y devuelve el registro actualizado
            [clienteid, usuarioid, fecha, metodopagoid, total, id]
        );
        return result.rows[0]; // Retorna el registro actualizado
    } catch (error) {
        console.error("Error updating sale:", error);
        throw error; // Se lanza el error para manejarlo en un nivel superior
    }
}

export const deleteSale = async (id) => {
    try {
        const result = await db.query("DELETE FROM ventas WHERE id = $1 RETURNING *", [id]);
        return result.rows[0]; // Retorna el registro eliminado
    } catch (error) {
        console.error("Error deleting sale:", error);
        throw error; // Se lanza el error para manejarlo en un nivel superior
    }
}