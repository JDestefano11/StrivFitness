import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Create a new order from cart
export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const userId = req.user.id;
        const { shippingAddress, paymentMethod } = req.body;
        
        // Validate required fields
        if (!shippingAddress || !paymentMethod) {
            return res.status(400).json({ 
                message: 'Shipping address and payment method are required' 
            });
        }
        
        // Get user's cart
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        
        // Verify all products are in stock and active
        const stockUpdates = [];
        const orderItems = [];
        
        for (const item of cart.items) {
            const product = item.product;
            
            // Check if product is active
            if (!product.active) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ 
                    message: `Product "${product.name}" is no longer available` 
                });
            }
            
            // Check if enough stock
            if (product.stock < item.quantity) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ 
                    message: `Not enough stock for "${product.name}". Available: ${product.stock}` 
                });
            }
            
            // Add to stock updates
            stockUpdates.push({
                updateOne: {
                    filter: { _id: product._id },
                    update: { $inc: { stock: -item.quantity } }
                }
            });
            
            // Add to order items
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: item.price
            });
        }
        
        // Create the order
        const order = new Order({
            user: userId,
            items: orderItems,
            total: cart.total,
            shippingAddress,
            paymentMethod
        });
        
        // Save the order
        await order.save({ session });
        
        // Update product stock
        await Product.bulkWrite(stockUpdates, { session });
        
        // Clear the cart
        cart.items = [];
        cart.total = 0;
        await cart.save({ session });
        
        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        
        // Return the order with populated items
        const populatedOrder = await Order.findById(order._id).populate('items.product');
        
        res.status(201).json({
            message: 'Order created successfully',
            order: populatedOrder
        });
    } catch (error) {
        // Abort transaction on error
        await session.abortTransaction();
        session.endSession();
        
        res.status(500).json({ 
            message: 'Error creating order', 
            error: error.message 
        });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;
        
        const order = await Order.findById(orderId).populate('items.product');
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Ensure user can only access their own orders (unless admin)
        if (order.user.toString() !== userId && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching order', 
            error: error.message 
        });
    }
};

// Get all orders for a user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const orders = await Order.find({ user: userId })
            .populate('items.product')
            .sort({ createdAt: -1 });
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching orders', 
            error: error.message 
        });
    }
};

// Update order status (admin only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;
        
        if (!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // If cancelling an order that was not cancelled before, restore stock
        if (status === 'cancelled' && order.status !== 'cancelled') {
            const stockUpdates = [];
            
            for (const item of order.items) {
                stockUpdates.push({
                    updateOne: {
                        filter: { _id: item.product },
                        update: { $inc: { stock: item.quantity } }
                    }
                });
            }
            
            await Product.bulkWrite(stockUpdates);
        }
        
        order.status = status;
        await order.save();
        
        const updatedOrder = await Order.findById(orderId).populate('items.product');
        
        res.status(200).json({
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating order status', 
            error: error.message 
        });
    }
};