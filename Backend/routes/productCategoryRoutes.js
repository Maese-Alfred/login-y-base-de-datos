import express from 'express';

import{
    createProductCategory,
    getAllProductCategories,
    getProductCategoryByName,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory
} from '../controllers/productCategoryController.js';

const router = express.Router();

// Create a new product category

router.post('/', createProductCategory);
router.get('/', getAllProductCategories);
router.get('/:name', getProductCategoryByName);
router.get('/id/:id', getProductCategoryById);
router.put('/:id', updateProductCategory);
router.delete('/:id', deleteProductCategory);
