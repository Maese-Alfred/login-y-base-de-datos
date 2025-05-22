import db from "../config/db.js";

// Crear producto
export const createProduct = async ({ nombreProducto, cantidad, precio, categoriaId }) => {
  try {
    console.log("Creating product with values:", { nombreProducto, cantidad, precio, categoriaId });
    const [product] = await db`
      INSERT INTO inventario (nombreProducto, cantidad, precio, categoriaid)
      VALUES (${nombreProducto}, ${cantidad}, ${precio}, ${categoriaId})
      RETURNING *;
    `;
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Obtener todo el inventario con nombre de categoría
export const getAllInventory = async () => {
  try {
    const result = await db`
      SELECT  i.id,
              i.nombreproducto AS "nombreProducto",
              i.cantidad,
              i.precio,
              i.categoriaid,  
              c.nombre        AS categoria
      FROM inventario i
      JOIN categoriasproductos c ON i.categoriaid = c.id;
    `;
    return result;              // ← ya viene camelCase
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

// Obtener producto por ID
export const getProductById = async (id) => {
  try {
    const [product] = await db`
      SELECT * FROM inventario WHERE id = ${id};
    `;
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

// Actualizar producto
export const updateProduct = async (id, { nombreProducto, cantidad, precio, categoriaid }) => {
  try {
    console.log("Updating product with ID:", id);
    console.log("New values:", { nombreProducto, cantidad, precio, categoriaid });

    const [product] = await db`
      UPDATE inventario
      SET nombreProducto = ${nombreProducto}, 
          cantidad = ${cantidad}, 
          precio = ${precio}, 
          categoriaid = ${categoriaid}
      WHERE id = ${id}
      RETURNING *;
    `;
    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (id) => {
  try {
    const [product] = await db`
      DELETE FROM inventario WHERE id = ${id} RETURNING *;
    `;
    return product;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProducstCategories = async () => {
  try {
    const categories = await db`
      SELECT * FROM categoriasproductos;
    `;
    return categories;
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
}