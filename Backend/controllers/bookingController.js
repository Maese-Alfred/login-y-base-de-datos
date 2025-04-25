import * as Booking from "../models/bookingModel.js";

export const createBooking = async (req, res) => {
    const { clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado } = req.body;
    try {
        const newBooking = await Booking.createBooking({ clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado });
        res.status(201).json(newBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Error creating booking" });
    }
}

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Error fetching bookings" });
    }
}

export const getBookingByClientId = async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await Booking.getBookingByClientId(id);
        if (!bookings) {
            return res.status(404).json({ message: "Bookings not found" });
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching booking by client ID:", error);
        res.status(500).json({ message: "Error fetching booking" });
    }
}

export const getBookingByZoneDate = async (req, res) => {
    const { zoneId, date } = req.params;
    try {
        const bookings = await Booking.getBookingByZoneDate(zoneId, date);
        if (!bookings) {
            return res.status(404).json({ message: "Bookings not found" });
        }
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching booking by zone and date:", error);
        res.status(500).json({ message: "Error fetching booking" });
    }
}

export const getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.getBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        res.status(500).json({ message: "Error fetching booking" });
    }
}

export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado } = req.body;
    try {
        const updatedBooking = await Booking.updateBooking(id, { clienteid, fecha, hora, estadoreservaid, zonacampotiroid, montopagado });
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Error updating booking" });
    }
}

export const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await Booking.deleteBooking(id);
        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json(deletedBooking);
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Error deleting booking" });
    }
}