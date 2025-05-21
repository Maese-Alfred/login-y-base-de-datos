import express from 'express';
import {validateSchema} from '../middlewares/validateUserSchemas.js';
import verifyToken  from '../middlewares/authMiddleware.js';

import { 
    updateUser, 
    getAllUsers,
    getUserById,
    getUserByUID,
    createUser,
    deleteUser} from '../controllers/userController.js';
import { userSchema } from '../schemas/userSchemas.js';

const router = express.Router();

router.post('/', validateSchema(userSchema), createUser);
router.get('/', verifyToken, getAllUsers);
router.get('/uid/:uid', verifyToken, getUserByUID);
router.get('/:id', verifyToken,  getUserById);
router.put('/:id', verifyToken,  validateSchema(userSchema), updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;