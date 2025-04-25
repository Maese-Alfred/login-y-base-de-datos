import * as PayMethod from '../models/payMethodModel.js';

export const createPayMethod = async (req, res) => {
    const { tipo } = req.body;
    try {
        const newPayMethod = await PayMethod.createPayMethod({ tipo });
        res.status(201).json(newPayMethod);
    } catch (error) {
        console.error("Error creating pay method:", error);
        res.status(500).json({ message: "Error creating pay method" });
    }
}

export const getAllPayMethods = async (req, res) => {
    try {
        const payMethods = await PayMethod.getAllPayMethods();
        res.status(200).json(payMethods);
    } catch (error) {
        console.error("Error fetching pay methods:", error);
        res.status(500).json({ message: "Error fetching pay methods" });
    }
}

export const getPayMethodById = async (req, res) => {
    const { id } = req.params;
    try {
        const payMethod = await PayMethod.getPayMethodById(id);
        if (!payMethod) {
            return res.status(404).json({ message: "Pay method not found" });
        }
        res.status(200).json(payMethod);
    } catch (error) {
        console.error("Error fetching pay method by ID:", error);
        res.status(500).json({ message: "Error fetching pay method" });
    }
}

export const updatePayMethod = async (req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;
    try {
        const updatedPayMethod = await PayMethod.updatePayMethod(id, { tipo });
        if (!updatedPayMethod) {
            return res.status(404).json({ message: "Pay method not found" });
        }
        res.status(200).json(updatedPayMethod);
    } catch (error) {
        console.error("Error updating pay method:", error);
        res.status(500).json({ message: "Error updating pay method" });
    }
}

export const deletePayMethod = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPayMethod = await PayMethod.deletePayMethod(id);
        if (!deletedPayMethod) {
            return res.status(404).json({ message: "Pay method not found" });
        }
        res.status(200).json(deletedPayMethod);
    } catch (error) {
        console.error("Error deleting pay method:", error);
        res.status(500).json({ message: "Error deleting pay method" });
    }
}
