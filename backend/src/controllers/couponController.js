import Coupon from '../models/Coupon.js';

// Test route to create a sample coupon for testing
export const createTestCoupon = async (req, res) => {
    try {
        // Sample test coupon
        const testCoupon = {
            code: 'TEST25',
            discount: 25,
            discountType: 'percentage',
            minimumPurchase: 50,
            expirationDate: new Date(2025, 11, 31), // December 31, 2025
            isActive: true,
            maxUses: 100,
            usedCount: 0,
            description: '25% off your purchase of $50 or more (Test Coupon)'
        };

        // Check if test coupon already exists
        const existingCoupon = await Coupon.findOne({ code: testCoupon.code });
        
        if (existingCoupon) {
            return res.status(200).json({
                message: 'Test coupon already exists',
                coupon: existingCoupon
            });
        }

        // Create the test coupon
        const newCoupon = await Coupon.create(testCoupon);
        
        return res.status(201).json({
            message: 'Test coupon created successfully',
            coupon: newCoupon
        });
    } catch (error) {
        console.error('Error creating test coupon:', error);
        return res.status(500).json({ message: 'Server error while creating test coupon' });
    }
};

// Validate a coupon code without requiring authentication
export const validateCoupon = async (req, res) => {
    try {
        const { code, totalAmount } = req.body;
        
        if (!code) {
            return res.status(400).json({ message: 'Coupon code is required' });
        }
        
        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase(),
            isActive: true,
            expirationDate: { $gt: new Date() }
        });
        
        if (!coupon) {
            return res.status(404).json({ message: 'Invalid or expired coupon code' });
        }
        
        // Check minimum purchase requirement
        if (totalAmount && coupon.minimumPurchase > 0 && totalAmount < coupon.minimumPurchase) {
            return res.status(400).json({ 
                message: `This coupon requires a minimum purchase of $${coupon.minimumPurchase}`,
                minimumPurchase: coupon.minimumPurchase
            });
        }
        
        // Check if coupon has reached maximum uses
        if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
            return res.status(400).json({ message: 'This coupon has reached its maximum usage limit' });
        }
        
        // Calculate discount amount
        let discountAmount = 0;
        if (coupon.discountType === 'percentage') {
            discountAmount = totalAmount ? (totalAmount * coupon.discount / 100) : null;
        } else { // fixed amount
            discountAmount = coupon.discount;
        }
        
        return res.status(200).json({
            valid: true,
            coupon: {
                code: coupon.code,
                discount: coupon.discount,
                discountType: coupon.discountType,
                discountAmount: discountAmount,
                minimumPurchase: coupon.minimumPurchase,
                description: coupon.description
            }
        });
    } catch (error) {
        console.error('Error validating coupon:', error);
        return res.status(500).json({ message: 'Server error while validating coupon' });
    }
};

// Apply a coupon to an order (increment usage count)
export const applyCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        
        if (!code) {
            return res.status(400).json({ message: 'Coupon code is required' });
        }
        
        const coupon = await Coupon.findOne({ 
            code: code.toUpperCase(),
            isActive: true,
            expirationDate: { $gt: new Date() }
        });
        
        if (!coupon) {
            return res.status(404).json({ message: 'Invalid or expired coupon code' });
        }
        
        // Check if coupon has reached maximum uses
        if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
            return res.status(400).json({ message: 'This coupon has reached its maximum usage limit' });
        }
        
        // Increment the used count
        coupon.usedCount += 1;
        await coupon.save();
        
        return res.status(200).json({
            message: 'Coupon applied successfully',
            coupon: {
                code: coupon.code,
                discount: coupon.discount,
                discountType: coupon.discountType
            }
        });
    } catch (error) {
        console.error('Error applying coupon:', error);
        return res.status(500).json({ message: 'Server error while applying coupon' });
    }
};

// Get coupon details by code
export const getCouponByCode = async (req, res) => {
    try {
        const { code } = req.params;
        
        if (!code) {
            return res.status(400).json({ message: 'Coupon code is required' });
        }
        
        const coupon = await Coupon.findOne({ code: code.toUpperCase() });
        
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }
        
        return res.status(200).json({
            code: coupon.code,
            discount: coupon.discount,
            discountType: coupon.discountType,
            minimumPurchase: coupon.minimumPurchase,
            expirationDate: coupon.expirationDate,
            isActive: coupon.isActive,
            description: coupon.description
        });
    } catch (error) {
        console.error('Error getting coupon:', error);
        return res.status(500).json({ message: 'Server error while getting coupon' });
    }
};
