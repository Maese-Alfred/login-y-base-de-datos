import express from 'express';

import{
    createBookingStatus,
    getBookingStatusById,
    getAllBookingStatus,
    getBookingStatusByDescription,
    updateBookingStatus,
    deleteBookingStatus,
} from '../controllers/bookingStatusController.js';

const router = express.Router();

// Define the routes for booking statuses
router.get('/', getAllBookingStatus); // Get all booking statuses
router.get('/description/:description', getBookingStatusByDescription); // Get all booking statuses by description
router.get('/:id', getBookingStatusById); // Get booking status by ID
router.post('/', createBookingStatus); // Create a new booking status
router.put('/:id', updateBookingStatus); // Update a booking status by ID
router.delete('/:id', deleteBookingStatus); // Delete a booking status by ID

