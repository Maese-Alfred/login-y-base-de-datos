import * as ProductCategory from "../models/productCategory.js";

export const createProductCategory = async (req, res) => {
    const { nombre } = req.body;
    try {
        const newProductCategory = await ProductCategory.createProductCategory({ nombre });
        res.status(201).json(newProductCategory);
    } catch (error) {
        console.error("Error creating product category:", error);
        res.status(500).json({ message: "Error creating product category" });
    }
}

export const getAllProductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategory.getAllProductCategories();
        res.status(200).json(productCategories);
    } catch (error) {
        console.error("Error fetching product categories:", error);
        res.status(500).json({ message: "Error fetching product categories" });
    }
}

export const getProductCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const productCategory = await ProductCategory.getProductCategoryById(id);
        if (!productCategory) {
            return res.status(404).json({ message: "Product category not found" });
        }
        res.status(200).json(productCategory);
    } catch (error) {
        console.error("Error fetching product category by ID:", error);
        res.status(500).json({ message: "Error fetching product category" });
    }
}

export const updateProductCategory = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const updatedProductCategory = await ProductCategory.updateProductCategory(id, { nombre });
        if (!updatedProductCategory) {
            return res.status(404).json({ message: "Product category not found" });
        }
        res.status(200).json(updatedProductCategory);
    } catch (error) {
        console.error("Error updating product category:", error);
        res.status(500).json({ message: "Error updating product category" });
    }
}

export const deleteProductCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProductCategory = await ProductCategory.deleteProductCategory(id);
        if (!deletedProductCategory) {
            return res.status(404).json({ message: "Product category not found" });
        }
        res.status(200).json({ message: "Product category deleted successfully" });
    } catch (error) {
        console.error("Error deleting product category:", error);
        res.status(500).json({ message: "Error deleting product category" });
    }
}

export const getProductCategoryByName = async (req, res) => {
    const { nombre } = req.params;
    try {
        const productCategory = await ProductCategory.getProductCategoryByName(nombre);
        if (!productCategory) {
            return res.status(404).json({ message: "Product category not found" });
        }
        res.status(200).json(productCategory);
    } catch (error) {
        console.error("Error fetching product category by name:", error);
        res.status(500).json({ message: "Error fetching product category" });
    }
}
