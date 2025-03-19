import express from 'express';
import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle
} from '../controllers/articleController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllArticles);
router.get('/:id', getArticleById);

// Admin-only routes
router.post('/', verifyToken, isAdmin, createArticle);
router.put('/:id', verifyToken, isAdmin, updateArticle);
router.delete('/:id', verifyToken, isAdmin, deleteArticle);

export default router;