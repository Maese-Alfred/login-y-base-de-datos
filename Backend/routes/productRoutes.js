import express from 'express';

import{
    createProduct,
    getAllInventory,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsCategories
} from '../controllers/productController.js';

const router = express.Router();


router.post('/', createProduct);
router.get('/', getAllInventory);
router.get('/categories', getProductsCategories);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;