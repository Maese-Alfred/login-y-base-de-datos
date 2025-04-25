import express from 'express';
import {validateSchema} from '../middlewares/validateUserSchemas.js';
import verifyToken  from '../middlewares/authMiddleware.js';
import {authorizeRole}  from '../middlewares/authorizeRole.js';

import { 
    updateUser, 
    getAllUsers,
    getUserById,
    getUserByUID,
    createUser,
    deleteUser} from '../controllers/userController.js';
import { userSchema } from '../schemas/userSchemas.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRole(['admin']), getAllUsers);
router.get('/uid/:uid', verifyToken, getUserByUID);
router.get('/:id', verifyToken, authorizeRole(['admin']), getUserById);
router.post('/', verifyToken, authorizeRole(['admin']), validateSchema(userSchema), createUser);
router.put('/:id', verifyToken, authorizeRole(['admin']), validateSchema(userSchema), updateUser);
router.delete('/:id', verifyToken, authorizeRole(['admin']), deleteUser);
