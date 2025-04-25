import express from 'express';

import{
    createPayMethod,
    getAllPayMethods,
    getPayMethodById,
    updatePayMethod,
    deletePayMethod,
} from '../controllers/payMethodController.js';

const router = express.Router();

// Define the routes for payment methods

router.get('/', getAllPayMethods); // Get all payment methods
router.get('/:id', getPayMethodById); // Get payment method by ID
router.post('/', createPayMethod); // Create a new payment method
router.put('/:id', updatePayMethod); // Update a payment method by ID
router.delete('/:id', deletePayMethod); // Delete a payment method by ID

export default router;