import * as SaleProduct from "../models/saleProductModel.js";

export const createSaleProduct = async (req, res) => {
    const { cantidad, precioUnitario, venta_id, producto_id } = req.body; // Asegúrate de que estos valores se pasen correctamente
    try {
        const newSaleProduct = await SaleProduct.createSaleProduct({ cantidad, precioUnitario, venta_id, producto_id });
        res.status(201).json(newSaleProduct); // Retorna el producto de venta recién creado
    } catch (error) {
        console.error("Error creating sale product:", error);
        res.status(500).json({ message: "Error creating sale product" });
    }
}

export const getAllSaleProducts = async (req, res) => {
    try {
        const saleProducts = await SaleProduct.getAllSaleProducts();
        res.status(200).json(saleProducts); // Retorna todos los productos vendidos con la información detallada
    } catch (error) {
        console.error("Error fetching sale products:", error);
        res.status(500).json({ message: "Error fetching sale products" });
    }
}

export const getSaleProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const saleProduct = await SaleProduct.getSaleProductById(id);
        if (!saleProduct) {
            return res.status(404).json({ message: "Sale product not found" });
        }
        res.status(200).json(saleProduct); // Retorna el producto de venta por su ID
    } catch (error) {
        console.error("Error fetching sale product by ID:", error);
        res.status(500).json({ message: "Error fetching sale product" });
    }
}

export const getSaleProductBySaleId = async (req, res) => {
    const { venta_id } = req.params;
    try {
        const saleProducts = await SaleProduct.getSaleProductBySaleId(venta_id);
        if (!saleProducts) {
            return res.status(404).json({ message: "No sale products found for this sale ID" });
        }
        res.status(200).json(saleProducts); // Retorna todos los productos asociados a la venta por el ID de venta
    } catch (error) {
        console.error("Error fetching sale product by sale ID:", error);
        res.status(500).json({ message: "Error fetching sale product" });
    }
}

export const updateSaleProduct = async (req, res) => {
    const { id } = req.params;
    const { cantidad, precioUnitario } = req.body;
    try {
        const updatedSaleProduct = await SaleProduct.updateSaleProduct(id, { cantidad, precioUnitario });
        if (!updatedSaleProduct) {
            return res.status(404).json({ message: "Sale product not found" });
        }
        res.status(200).json(updatedSaleProduct); // Retorna el producto de venta actualizado
    } catch (error) {
        console.error("Error updating sale product:", error);
        res.status(500).json({ message: "Error updating sale product" });
    }
}

export const deleteSaleProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSaleProduct = await SaleProduct.deleteSaleProduct(id);
        if (!deletedSaleProduct) {
            return res.status(404).json({ message: "Sale product not found" });
        }
        res.status(200).json({ message: "Sale product deleted successfully" }); // Retorna un mensaje de éxito
    } catch (error) {
        console.error("Error deleting sale product:", error);
        res.status(500).json({ message: "Error deleting sale product" });
    }
}
