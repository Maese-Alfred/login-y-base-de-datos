import express from 'express';

import{
    createZone,
    getAllZones,
    getZonesDisponibilityByDate,
    getZoneById,
    getZonesWithConfiguration,
    getZonesWithBooking,
    updateZone,
    deleteZone,
} from '../controllers/zoneController.js';

const router = express.Router();

// Create a new zone
router.post('/', createZone);
router.get('/', getAllZones);
router.get('/disponibility/:date', getZonesDisponibilityByDate);
router.get('/configuration/:id', getZonesWithConfiguration);
router.get('/booking/:id', getZonesWithBooking);
router.get('/:id', getZoneById);
router.put('/:id', updateZone);
router.delete('/:id', deleteZone);

