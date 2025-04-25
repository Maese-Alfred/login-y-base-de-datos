import db from "../config/db.js";
const sql = db;

export const createSaleProduct = async (saleProduct) => {
    try {
        const { cantidad, precioUnitario, venta_id, producto_id } = saleProduct; // Asegúrate de que estos valores se pasen correctamente
        const result = await db.query(
            `INSERT INTO ventaProducto (cantidad, precioUnitario, venta_id, producto_id)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [cantidad, precioUnitario, venta_id, producto_id]
        );
        return result.rows[0]; // Retorna el producto de venta recién creado
    } catch (error) {
        console.error("Error creating sale product:", error);
        throw error;
    }
}

export const getAllSaleProducts = async () => {
    try {
        const result = await db.query(`
            SELECT v.id AS venta_id, v.fecha, c.nombre AS cliente, vp.cantidad, vp.preciounitario, i.nombreproducto 
            FROM ventaProducto vp
            JOIN ventas v ON vp.venta_id = v.id
            JOIN clientes c ON v.clienteid = c.id
            JOIN inventario i ON vp.producto_id = i.id
        `);
        return result.rows; // Retorna todos los productos vendidos con la información detallada
    } catch (error) {
        console.error("Error fetching sale products:", error);
        throw error;
    }
}

export const getSaleProductById = async (id) => {
    try {
        const result = await db.query("SELECT * FROM ventaProducto WHERE id = $1", [id]);
        return result.rows[0]; // Retorna el producto de venta por su ID
    } catch (error) {
        console.error("Error fetching sale product by ID:", error);
        throw error;
    }
}

export const getSaleProductBySaleId = async (venta_id) => {
    try {
        const result = await db.query("SELECT * FROM ventaProducto WHERE venta_id = $1", [venta_id]);
        return result.rows; // Retorna todos los productos asociados a la venta por el ID de venta
    } catch (error) {
        console.error("Error fetching sale product by sale ID:", error);
        throw error;
    }
}

export const updateSaleProduct = async (id, saleProduct) => {
    const { cantidad, precioUnitario } = saleProduct;
    try {
        const result = await db.query(
            `UPDATE ventaProducto SET cantidad = $1, precioUnitario = $2 WHERE id = $3 RETURNING *`,
            [cantidad, precioUnitario, id]
        );
        return result.rows[0]; // Retorna el producto actualizado
    } catch (error) {
        console.error("Error updating sale product:", error);
        throw error;
    }
}

export const deleteSaleProduct = async (id) => {
    try {
        const result = await db.query("DELETE FROM ventaProducto WHERE id = $1 RETURNING *", [id]);
        return result.rows[0]; // Retorna el producto eliminado
    } catch (error) {
        console.error("Error deleting sale product:", error);
        throw error;
    }
}