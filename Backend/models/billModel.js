import db from "../config/db.js";
const sql = db;

export const createBill = async (Bill) => {
    try {
        const { clienteid, usuarioid, fecha, montototal, estadofacturaid } = Bill;
        const result = await db.query(
            `INSERT INTO facturas (clienteid, usuarioid, fecha, montototal, estadofacturaid)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [clienteid, usuarioid, fecha, montototal, estadofacturaid]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating Bill:", error);
        throw error;
    }
};

// Obtener todas las facturas
export const getAllBills = async () => {
    try {
        const result = await db.query(`
            SELECT f.*, 
                   c.nombre AS cliente, 
                   u.nombre AS usuario, 
                   ef.descripcion AS estado
            FROM facturas f
            JOIN clientes c ON f.clienteid = c.id
            JOIN usuarios u ON f.usuarioid = u.id
            JOIN estadosfactura ef ON f.estadofacturaid = ef.id
        `);
        return result.rows;
    } catch (error) {
        console.error("Error fetching Bills:", error);
        throw error;
    }
};

// Obtener factura por ID
export const getBillById = async (id) => {
    try {
        const result = await db.query(`
            SELECT f.*, 
                   c.nombre AS cliente, 
                   u.nombre AS usuario, 
                   ef.descripcion AS estado
            FROM facturas f
            JOIN clientes c ON f.clienteid = c.id
            JOIN usuarios u ON f.usuarioid = u.id
            JOIN estadosfactura ef ON f.estadofacturaid = ef.id
            WHERE f.id = $1
        `, [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching Bill by ID:", error);
        throw error;
    }
};

// Actualizar factura
export const updateBill = async (id, Bill) => {
    const { clienteid, usuarioid, fecha, montototal, estadofacturaid } = Bill;
    try {
        const result = await db.query(
            `UPDATE facturas 
             SET clienteid = $1, usuarioid = $2, fecha = $3, montototal = $4, estadofacturaid = $5
             WHERE id = $6 RETURNING *`,
            [clienteid, usuarioid, fecha, montototal, estadofacturaid, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating Bill:", error);
        throw error;
    }
};

// Eliminar factura
export const deleteBill = async (id) => {
    try {
        const result = await db.query("DELETE FROM facturas WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting Bill:", error);
        throw error;
    }
};

// Obtener todas las facturas de un usuario
export const getAllBillsByUser = async (userid) => {
    try {
        const result = await db.query(`
            SELECT f.*, 
                   c.nombre AS cliente, 
                   u.nombre AS usuario, 
                   ef.descripcion AS estado
            FROM facturas f
            JOIN clientes c ON f.clienteid = c.id
            JOIN usuarios u ON f.usuarioid = u.id
            JOIN estadosfactura ef ON f.estadofacturaid = ef.id
            WHERE f.usuarioid = $1
        `, [userid]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching Bills by user:", error);
        throw error;
    }
};