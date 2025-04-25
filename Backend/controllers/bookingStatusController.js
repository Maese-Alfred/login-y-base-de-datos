import * as BookingStatus from "../models/bookingStatusModel.js";

export const createBookingStatus = async (req, res) => {
    const { descripcion } = req.body;
    try {
        const newBookingStatus = await BookingStatus.createBookingStatus({ descripcion });
        res.status(201).json(newBookingStatus);
    } catch (error) {
        console.error("Error creating booking status:", error);
        res.status(500).json({ message: "Error creating booking status" });
    }
}

export const getAllBookingStatus = async (req, res) => {
    try {
        const bookingStatus = await BookingStatus.getAllBookingStatus();
        res.status(200).json(bookingStatus);
    } catch (error) {
        console.error("Error fetching booking status:", error);
        res.status(500).json({ message: "Error fetching booking status" });
    }
}

export const getBookingStatusById = async (req, res) => {
    const { id } = req.params;
    try {
        const bookingStatus = await BookingStatus.getBookingStatusById(id);
        if (!bookingStatus) {
            return res.status(404).json({ message: "Booking status not found" });
        }
        res.status(200).json(bookingStatus);
    } catch (error) {
        console.error("Error fetching booking status by ID:", error);
        res.status(500).json({ message: "Error fetching booking status" });
    }
}

export const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;
    try {
        const updatedBookingStatus = await BookingStatus.updateBookingStatus(id, { descripcion });
        if (!updatedBookingStatus) {
            return res.status(404).json({ message: "Booking status not found" });
        }
        res.status(200).json(updatedBookingStatus);
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({ message: "Error updating booking status" });
    }
}

export const deleteBookingStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBookingStatus = await BookingStatus.deleteBookingStatus(id);
        if (!deletedBookingStatus) {
            return res.status(404).json({ message: "Booking status not found" });
        }
        res.status(200).json(deletedBookingStatus);
    } catch (error) {
        console.error("Error deleting booking status:", error);
        res.status(500).json({ message: "Error deleting booking status" });
    }
}

export const getBookingStatusByDescription = async (req, res) => {
    const { descripcion } = req.params;
    try {
        const bookingStatus = await BookingStatus.getBookingStatusByDescription(descripcion);
        if (!bookingStatus) {
            return res.status(404).json({ message: "Booking status not found" });
        }
        res.status(200).json(bookingStatus);
    } catch (error) {
        console.error("Error fetching booking status by description:", error);
        res.status(500).json({ message: "Error fetching booking status" });
    }
}