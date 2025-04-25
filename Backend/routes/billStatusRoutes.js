import express from 'express';

import {
    createBillStatus,
    getBillStatusById,
    getAllBillStatuses,
    updateBillStatus,
    deleteBillStatus,
    getAllBillStatusesByDescription
} from '../controllers/billStatusController.js';

const router = express.Router();

// Define the routes for bill statuses
router.get('/', getAllBillStatuses); // Get all bill statuses
router.get('/description/:description', getAllBillStatusesByDescription); // Get all bill statuses by description
router.get('/:id', getBillStatusById); // Get bill status by ID
router.post('/', createBillStatus); // Create a new bill status
router.put('/:id', updateBillStatus); // Update a bill status by ID
router.delete('/:id', deleteBillStatus); // Delete a bill status by ID
