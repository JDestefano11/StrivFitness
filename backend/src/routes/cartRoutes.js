import express from 'express';
import { 
    getCart, 
    addToCart, 
    updateCartItem, 
    removeFromCart,
    clearCart
} from '../controllers/cartController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(verifyToken);


router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

export default router;