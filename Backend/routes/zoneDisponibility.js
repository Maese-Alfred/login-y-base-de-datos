import express from 'express';

import{ 
    createZoneDisponibility,
    getDisponibilitywithZone,
    getDisponibilityByDate,
    getDisponibilityByZoneId,
    updateZoneDisponibility,
    deleteZoneDisponibility
} from '../controllers/zoneDisponibilityController.js';

const router = express.Router();

// Create a new zone disponibility
router.post('/', createZoneDisponibility);
router.get('/', getDisponibilitywithZone);
router.get('/date/:date', getDisponibilityByDate);
router.get('/zone/:id', getDisponibilityByZoneId);
router.put('/:id', updateZoneDisponibility);
router.delete('/:id', deleteZoneDisponibility);
