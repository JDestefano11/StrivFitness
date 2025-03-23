import express from 'express';
import { 
    createOrder, 
    getOrderById, 
    getUserOrders, 
    updateOrderStatus 
} from '../controllers/orderController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// User routes
router.use(verifyToken);
router.post('/', createOrder);
router.get('/user', getUserOrders);
router.get('/:id', getOrderById);

// Admin routes
router.put('/:id/status', isAdmin, updateOrderStatus);

export default router;