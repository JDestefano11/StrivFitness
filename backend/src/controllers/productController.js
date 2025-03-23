// controllers/productController.js
import Product from '../models/Product.js';

// Get all active products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ active: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get product by id
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id, active: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Get featured products 
export const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await Product.find({ featured: true, active: true });
        res.status(200).json(featuredProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching featured products', error: error.message });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category, active: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error: error.message });
    }
};

// Search products
export const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const products = await Product.find({
            active: true,
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error searching products', error: error.message });
    }
};