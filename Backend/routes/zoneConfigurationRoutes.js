import express from 'express';

import{
    createZoneConfiguration,
    getAllZoneConfigurations,
    getZoneConfigurationById,
    updateZoneConfiguration,
    deleteZoneConfiguration,
} from '../controllers/zoneConfigurationController.js';


const router = express.Router();

// Create a new zone configuration
router.post('/', createZoneConfiguration);
router.get('/', getAllZoneConfigurations);
router.get('/:id', getZoneConfigurationById);
router.put('/:id', updateZoneConfiguration);
router.delete('/:id', deleteZoneConfiguration);

export default router;