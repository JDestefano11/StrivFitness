import express from 'express';
import { 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getAllProductsAdmin,
    getProductByIdAdmin
} from '../controllers/adminProductController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();


router.use(verifyToken, isAdmin);


router.get('/', getAllProductsAdmin);
router.get('/:id', getProductByIdAdmin);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;