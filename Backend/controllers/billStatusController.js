import * as BillStatus from "../models/billStatusModel.js";

export const createBillStatus = async (req, res) => {
    const { descripcion } = req.body;
    try {
        const newBillStatus = await BillStatus.createBillStatus({ descripcion });
        res.status(201).json(newBillStatus);
    } catch (error) {
        console.error("Error creating bill status:", error);
        res.status(500).json({ message: "Error creating bill status" });
    }
}

export const getAllBillStatus = async (req, res) => {
    try {
        const billStatus = await BillStatus.getAllBillStatus();
        res.status(200).json(billStatus);
    } catch (error) {
        console.error("Error fetching bill status:", error);
        res.status(500).json({ message: "Error fetching bill status" });
    }
}

export const getBillStatusById = async (req, res) => {
    const { id } = req.params;
    try {
        const billStatus = await BillStatus.getBillStatusById(id);
        if (!billStatus) {
            return res.status(404).json({ message: "Bill status not found" });
        }
        res.status(200).json(billStatus);
    } catch (error) {
        console.error("Error fetching bill status by ID:", error);
        res.status(500).json({ message: "Error fetching bill status" });
    }
}

export const updateBillStatus = async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    try {
        const updatedBillStatus = await BillStatus.updateBillStatus(id, { descripcion });
        if (!updatedBillStatus) {
            return res.status(404).json({ message: "Bill status not found" });
        }
        res.status(200).json(updatedBillStatus);
    } catch (error) {
        console.error("Error updating bill status:", error);
        res.status(500).json({ message: "Error updating bill status" });
    }
}

export const deleteBillStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBillStatus = await BillStatus.deleteBillStatus(id);
        if (!deletedBillStatus) {
            return res.status(404).json({ message: "Bill status not found" });
        }
        res.status(200).json(deletedBillStatus);
    } catch (error) {
        console.error("Error deleting bill status:", error);
        res.status(500).json({ message: "Error deleting bill status" });
    }
}

export const getBillStatusByDescription = async (req, res) => {
    const { descripcion } = req.params;
    try {
        const billStatus = await BillStatus.getBillStatusByDescription(descripcion);
        if (!billStatus) {
            return res.status(404).json({ message: "Bill status not found" });
        }
        res.status(200).json(billStatus);
    } catch (error) {
        console.error("Error fetching bill status by description:", error);
        res.status(500).json({ message: "Error fetching bill status" });
    }
}