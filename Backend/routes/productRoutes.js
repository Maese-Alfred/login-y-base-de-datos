import express from 'express';

import{
    createProduct,
    getAllInventory,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Create a new product
router.post('/', createProduct);
router.get('/', getAllInventory);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;