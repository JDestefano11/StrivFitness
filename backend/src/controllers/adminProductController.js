import Product from '../models/Product.js';

// Create Product - Admin Only
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, stock, featured, discount } = req.body;
        
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageURL: imageUrl,
            stock,
            featured,
            discount
        });
        
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update Product - Admin Only 
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, stock, featured, discount, active } = req.body;
        
        // Find product and update it 
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                price,
                category,
                imageURL: imageUrl,
                stock,
                featured,
                discount,
                active
            },
            { new: true, runValidators: true }
        );
        
        // If not product return error
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product - Admin Only
export const deleteProduct = async (req, res) => {
    try {
        // Find product and delete it
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
        // If product is not found return error
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch(error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
}

// Get All Products - Admin View - Includes Active & Inactive Products
export const getAllProductsAdmin = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get a single product by ID - Admin Only
export const getProductByIdAdmin = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};