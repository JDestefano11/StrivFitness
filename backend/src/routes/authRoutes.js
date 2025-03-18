import express from 'express';
import { signup, login, logout, forgotPassword, forgotUsername } from '../controllers/authController.js';
import { refreshAccessToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/forgot-username', forgotUsername);
router.post('/refresh-token', refreshAccessToken);

export default router;
