import express from 'express';

import{
    createBooking,
    getBookingById,
    getAllBookings,
    updateBooking,
    deleteBooking,
    getBookingByZoneDate,
    getBookingByClientId,
} from '../controllers/bookingController.js';

const router = express.Router();

// Define the routes for bookings

router.get('/', getAllBookings); // Get all bookings
router.get('/client/:clientid', getBookingByClientId); // Get all bookings by client ID
router.get('/zone/:zoneid/:date', getBookingByZoneDate); // Get all bookings by zone ID and date
router.get('/:id', getBookingById); // Get booking by ID
router.post('/', createBooking); // Create a new booking
router.put('/:id', updateBooking); // Update a booking by ID
router.delete('/:id', deleteBooking); // Delete a booking by ID
