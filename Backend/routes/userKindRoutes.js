import express from 'express';

import{
    createKindUser,
    getAllKindUser,
    getKindUserById,
    updateKindUser,
    deleteKindUser,
} from '../controllers/userKindController.js';

const router = express.Router();

// Create a new kind of user
router.post('/', createKindUser);
router.get('/', getAllKindUser);
router.get('/:id', getKindUserById);
router.put('/:id', updateKindUser);
router.delete('/:id', deleteKindUser);

export default router;