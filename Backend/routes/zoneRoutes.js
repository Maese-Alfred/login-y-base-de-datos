import express from 'express';

import{
    createZone,
    getAllZones,
    getZoneDisponibilityWithConfigurationByDate,
    getZoneById,
    getZonesWithBooking,
    updateZone,
    deleteZone,

} from '../controllers/zoneController.js';

const router = express.Router();

// Create a new zone
router.post('/', createZone);
router.get('/', getAllZones);
router.get('/disponibility/:date/:id', getZoneDisponibilityWithConfigurationByDate );
router.get('/booking/:id', getZonesWithBooking);
router.get('/:id', getZoneById);
router.put('/:id', updateZone);
router.delete('/:id', deleteZone);

export default router;