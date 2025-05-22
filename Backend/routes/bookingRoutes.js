import express from 'express';

import{
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking,
    getBookingByClientId,
    getBookingStatusNameAndId
} from '../controllers/bookingController.js';

const router = express.Router();

// Define the routes for bookings

router.get('/', getAllBookings); // Get all bookings
router.get('/client/:clientid', getBookingByClientId); // Get all bookings by client ID
router.get('/status', getBookingStatusNameAndId); 
router.post('/', createBooking); // Create a new booking
router.put('/:id', updateBooking); // Update a booking by ID
router.delete('/:id', deleteBooking); // Delete a booking by ID

export default router;