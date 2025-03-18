import express from 'express';
import { forgotUsername, forgotPassword, resetPassword } from '../controllers/recoveryController.js';

const router = express.Router();

// Account Recovery Routes
router.post('/forgot-username', forgotUsername);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
