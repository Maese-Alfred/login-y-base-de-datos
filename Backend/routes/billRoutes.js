import express from 'express';

import{
    createBill,
    getBillById,
    getAllBills,
    updateBill,
    deleteBill,
} from '../controllers/billController.js';

const router = express.Router();

// Define the routes for bills
router.get('/', getAllBills); // Get all bills
router.get('/:id', getBillById); // Get bill by ID
router.post('/', createBill); // Create a new bill
router.put('/:id', updateBill); // Update a bill by ID
router.delete('/:id', deleteBill); // Delete a bill by ID

export default router;