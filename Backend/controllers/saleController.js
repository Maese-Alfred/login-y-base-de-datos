import * as Sale from "../models/saleModel.js";

export const createSale = async (req, res) => {
    const { clienteid, usuarioid, fecha, metodopagoid, total } = req.body;
    try {
        const newSale = await Sale.createSale({ clienteid, usuarioid, fecha, metodopagoid, total });
        res.status(201).json(newSale);
    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).json({ message: "Error creating sale" });
    }
}

export const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.getAllSales();
        res.status(200).json(sales);
    } catch (error) {
        console.error("Error fetching sales:", error);
        res.status(500).json({ message: "Error fetching sales" });
    }
}

export const updateSale = async (req, res) => {
    const { id } = req.params;
    const { clienteid, usuarioid, fecha, metodopagoid, total } = req.body;
    try {
        const updatedSale = await Sale.updateSale(id, { clienteid, usuarioid, fecha, metodopagoid, total });
        if (!updatedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json(updatedSale);
    } catch (error) {
        console.error("Error updating sale:", error);
        res.status(500).json({ message: "Error updating sale" });
    }
}

export const deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSale = await Sale.deleteSale(id);
        if (!deletedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json(deletedSale);
    } catch (error) {
        console.error("Error deleting sale:", error);
        res.status(500).json({ message: "Error deleting sale" });
    }
}