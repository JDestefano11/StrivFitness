import express from 'express';
import { validateCoupon, applyCoupon, getCouponByCode, createTestCoupon } from '../controllers/couponController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Test route to create a sample coupon (public for testing purposes)
router.post('/create-test', createTestCoupon);

// Public route - validate a coupon without authentication
router.post('/validate', validateCoupon);

// Protected routes - require authentication
router.post('/apply', verifyToken, applyCoupon);
router.get('/:code', verifyToken, getCouponByCode);

export default router;
