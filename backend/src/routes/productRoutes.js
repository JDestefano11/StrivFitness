// routes/productRoutes.js
import express from 'express';
import { 
    getAllProducts, 
    getProductById, 
    getFeaturedProducts,
    getProductsByCategory,
    searchProducts
} from '../controllers/productController.js';

const router = express.Router();

// Public routes - no authentication required
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

export default router;