import express from 'express';

import {
    createClient,
    getClientById,
    getAllClients,
    updateClient,
    deleteClient,   
} from '../controllers/clientController.js';

const router = express.Router();

// Define the routes for clients
router.get('/', getAllClients); // Get all clients
router.get('/:id', getClientById); // Get client by ID
router.post('/', createClient); // Create a new client
router.put('/:id', updateClient); // Update a client by ID
router.delete('/:id', deleteClient); // Delete a client by ID

export default router;