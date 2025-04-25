import * as Bill from "../models/Bill.js";


export const getAllBills = async (req, res) => {
    try {
        const bills = await Bill.getAllBills();
        res.status(200).json(bills);
    } catch (error) {
        console.error("Error fetching bills:", error);
        res.status(500).json({ message: "Error fetching bills" });
    }
}

export const getBillById = async (req, res) => {
    const { id } = req.params;
    try {
        const bill = await Bill.getBillById(id);
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        res.status(200).json(bill);
    } catch (error) {
        console.error("Error fetching bill by ID:", error);
        res.status(500).json({ message: "Error fetching bill" });
    }
}

export const getBillByUser = async (req, res) => {
    const { usuarioid } = req.params;
    try {
        const bills = await Bill.getBillByUser(usuarioid);
        if (!bills) {
            return res.status(404).json({ message: "Bills not found" });
        }
        res.status(200).json(bills);
    } catch (error) {
        console.error("Error fetching bills by user:", error);
        res.status(500).json({ message: "Error fetching bills" });
    }
}


export const createBill = async (req, res) => {
    const{clienteid, usuarioid, fecha, montototal, estadofacturaid } = req.body;
    try {
        const newBill = await Bill.createBill({ clienteid, usuarioid, fecha, montototal, estadofacturaid });
        res.status(201).json(newBill);
    } catch (error) {
        console.error("Error creating bill:", error);
        res.status(500).json({ message: "Error creating bill" });
    }
}

export const updateBill = async (req, res) => {
    const { id } = req.params;
    const { clienteid, usuarioid, fecha, montototal, estadofacturaid } = req.body;
    try {
        const updatedBill = await Bill.updateBill(id, { clienteid, usuarioid, fecha, montototal, estadofacturaid });
        if (!updatedBill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        res.status(200).json(updatedBill);
    } catch (error) {
        console.error("Error updating bill:", error);
        res.status(500).json({ message: "Error updating bill" });
    }
}

export const deleteBill = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBill = await Bill.deleteBill(id);
        if (!deletedBill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        console.error("Error deleting bill:", error);
        res.status(500).json({ message: "Error deleting bill" });
    }
}
