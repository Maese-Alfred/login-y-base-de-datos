import express from 'express';
import {validateSchema} from '../middlewares/validateUserSchemas.js';
import verifyToken  from '../middlewares/authMiddleware.js';
import {authorizeRole}  from '../middlewares/authorizeRole.js';

import { 
    updateUser, 
    getAllUsers,
    getUserById,
    getUserByUID,
    getUserRole,
    createUser,
    deleteUser,
    registerUser } from '../controllers/userController.js';
import { userSchema } from '../schemas/userSchemas.js';

const router = express.Router();

router.get('/', verifyToken, authorizeRole(['admin']), getAllUsers);
router.get('/uid/:uid', verifyToken, getUserByUID);
router.get('/role/:uid', verifyToken, authorizeRole(['admin']), getUserRole);
router.get('/:id', verifyToken, authorizeRole(['admin']), getUserById);
router.post('/', verifyToken, authorizeRole(['admin']), validateSchema(userSchema), createUser);
router.put('/:id', verifyToken, authorizeRole(['admin']), validateSchema(userSchema), updateUser);
router.delete('/:id', verifyToken, authorizeRole(['admin']), deleteUser);
router.post('/register', validateSchema(userSchema), registerUser);
router.get('/me', verifyToken, async (req, res) => {
    try {
      const user = await user.getUserByUID(req.uid);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user info' });
    }
  });

export default router;