import * as Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
    const { nombreProducto, cantidad, precio, categoriaId } = req.body;
    console.log("Creating product with values:", { nombreProducto, cantidad, precio, categoriaId });
    console.log("Request body:", req.body);
    try {
        const newProduct = await Product.createProduct({ nombreProducto, cantidad, precio, categoriaId });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Error creating product" });
    }
}
export const getAllInventory  = async (req, res) => {
    try {
        const products = await Product.getAllInventory();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching inventory:", error);
        res.status(500).json({ message: "Error fetching inventory" });
    }
}

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Error fetching product" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombreProducto, cantidad, precio, categoriaid } = req.body;
    console.log("Updating product with ID:", id);
    console.log("New values:", { nombreProducto, cantidad, precio, categoriaid });
    
    try {
        const updatedProduct = await Product.updateProduct(id, { nombreProducto, cantidad, precio, categoriaid });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Error updating product" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error deleting product" });
    }
}

export const getProductsCategories = async (req, res) => {
    try {
        const categories = await Product.getProducstCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching product categories:", error);
        res.status(500).json({ message: "Error fetching product categories" });
    }
}