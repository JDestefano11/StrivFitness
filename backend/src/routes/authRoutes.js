import express from 'express';
import { signup, login, logout, signupAdmin } from '../controllers/authController.js';
import { refreshAccessToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth Routes
router.post('/signup', signup);
router.post('/signup-admin', signupAdmin); 
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshAccessToken);

export default router;
