import db from "../config/db.js";
const sql = db;

export const createProductCategory = async (productCategory) => {
  const { nombre } = productCategory;
  try {
    const query = "INSERT INTO CategoriasProductos (nombre) VALUES ($1) RETURNING *";
    const result = await sql.query(query, [nombre]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating product category:", error);
    throw error;
  }
}

export const getProductCategories = async () => {
  try {
    const query = "SELECT * FROM CategoriasProductos";
    const result = await sql.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
}

export const getProductCategoryById = async (id) => {
  try {
    const query = "SELECT * FROM CategoriasProductos WHERE id = $1";
    const result = await sql.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching product category by ID:", error);
    throw error;
  }
}

export const updateProductCategory = async (id, productCategory) => {
  const { nombre } = productCategory;
  try {
    const query = "UPDATE CategoriasProductos SET nombre = $1 WHERE id = $2 RETURNING *";
    const result = await sql.query(query, [nombre, id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating product category:", error);
    throw error;
  }
}

export const deleteProductCategory = async (id) => {
  try {
    const query = "DELETE FROM CategoriasProductos WHERE id = $1 RETURNING *";
    const result = await sql.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting product category:", error);
    throw error;
  }
}

export const getProductCategoryByName = async (nombre) => {
  try {
    const query = "SELECT * FROM CategoriasProductos WHERE nombre = $1";
    const result = await sql.query(query, [nombre]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching product category by name:", error);
    throw error;
  }
}