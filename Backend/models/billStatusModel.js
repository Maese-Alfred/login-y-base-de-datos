import db from "../config/db.js";
const sql = db;

export const createBillStatus = async (billStatus) => {
    const {descripcion} = billStatus;
    try {
        const result = await sql.query(
            `INSERT INTO estadosfacturas (descripcion) VALUES ($1) RETURNING *`,
            [descripcion]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating bill status:", error);
        throw error;
    }
}

export const getAllBillStatus = async () => {
    try {
        const result = await sql.query(`SELECT * FROM estadosfacturas`);
        return result.rows;
    } catch (error) {
        console.error("Error fetching bill status:", error);
        throw error;
    }
}

export const getBillStatusById = async (id) => {
    try {
        const result = await sql.query("SELECT * FROM estadosfacturas WHERE id = $1", [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching bill status by ID:", error);
        throw error;
    }
}

export const updateBillStatus = async (id, billStatus) => {
    const {descripcion} = billStatus;
    try {
        const result = await sql.query(
            `UPDATE estadosfacturas SET descripcion = $1 WHERE id = $2 RETURNING *`,
            [descripcion, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating bill status:", error);
        throw error;
    }
}

export const deleteBillStatus = async (id) => {
    try {
        const result = await sql.query("DELETE FROM estadosfacturas WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting bill status:", error);
        throw error;
    }
}

export const getBillStatusByDescription = async (descripcion) => {
    try {
        const result = await sql.query("SELECT * FROM estadosfacturas WHERE descripcion = $1", [descripcion]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching bill status by description:", error);
        throw error;
    }
}