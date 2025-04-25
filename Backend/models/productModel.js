import db from "../config/db.js";
const sql = db;

export const createProduct = async (product) => {
  try {
      const {nombreProducto, cantidad, precio, categoriaid} = product;
      const result = await db.query(
          `INSERT INTO inventario (nombreProducto, cantidad, precio, categoriaid) 
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [nombreProducto, cantidad, precio, categoriaid]
      );
      return result.rows[0];
  } catch (error) {
      console.error("Error creating product:", error);
      throw error;
  }
}

export const getAllInventory = async () => {
    try {
      const result = await db.query(`
        SELECT i.*, c.nombre AS categoria
        FROM inventario i
        JOIN categorias c ON i.categoriaid = c.id
      `);
      return result.rows;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      throw error;
    }
  };

export const getProductById = async (id) => {
    try {
      const result = await db.query("SELECT * FROM inventario WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  }

export const updateProduct = async (id, product) => {
    const {nombreProducto, cantidad, precio, categoriaid} = product;
    try {
        const result = await db.query(
            `UPDATE inventario 
             SET nombreProducto = $1, cantidad = $2, precio = $3, categoriaid = $4 
             WHERE id = $5 RETURNING *`,
            [nombreProducto, cantidad, precio, categoriaid, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        const result = await db.query("DELETE FROM inventario WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
}