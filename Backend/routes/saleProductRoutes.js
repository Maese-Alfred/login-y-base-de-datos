import express from 'express';

import{
    createSaleProduct,
    getAllSaleProducts,
    getSaleProductById,
    getSaleProductBySaleId,
    updateSaleProduct,
    deleteSaleProduct,
} from '../controllers/saleProductController.js';

const router = express.Router();

// Create a new sale product
router.post('/', createSaleProduct);
router.get('/', getAllSaleProducts);
router.get('/:id', getSaleProductById);
router.get('/sale/:id', getSaleProductBySaleId);
router.put('/:id', updateSaleProduct);
router.delete('/:id', deleteSaleProduct);

export default router;