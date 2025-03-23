import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// Get user's cart
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        
        let cart = await Cart.findOne({ user: userId }).populate('items.product');
        
        if (!cart) {
            cart = new Cart({ user: userId, items: [], total: 0 });
            await cart.save();
        }
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;
        
        // Validate product exists and is active
        const product = await Product.findOne({ _id: productId, active: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found or inactive' });
        }
        
        // Check if quantity is valid
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }
        
        // Check if product is in stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }
        
        // Find user's cart or create a new one
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [], total: 0 });
        }
        
        // Calculate item price (considering any discounts)
        const itemPrice = product.discount 
            ? product.price * (1 - product.discount / 100) 
            : product.price;
        
        // Check if product already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );
        
        if (existingItemIndex > -1) {
            // Update existing item
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].price = itemPrice;
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                price: itemPrice
            });
        }
        
        // Recalculate cart total
        cart.total = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        await cart.save();
        
        // Return populated cart
        const populatedCart = await Cart.findById(cart._id).populate('items.product');
        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};

// Update cart item
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;
        
        // Validate quantity
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }
        
        // Find user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        // Find the item in the cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );
        
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        // Validate product exists and is active
        const product = await Product.findOne({ _id: productId, active: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found or inactive' });
        }
        
        // Check if product is in stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }
        
        // Update item quantity
        cart.items[itemIndex].quantity = quantity;
        
        // Recalculate cart total
        cart.total = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        await cart.save();
        
        // Return populated cart
        const populatedCart = await Cart.findById(cart._id).populate('items.product');
        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        
        // Find user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        // Find the item in the cart
        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );
        
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        // Remove the item
        cart.items.splice(itemIndex, 1);
        
        // Recalculate cart total
        cart.total = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        await cart.save();
        
        // Return populated cart
        const populatedCart = await Cart.findById(cart._id).populate('items.product');
        res.status(200).json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing from cart', error: error.message });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Find user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        // Clear cart items and reset total
        cart.items = [];
        cart.total = 0;
        
        await cart.save();
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};