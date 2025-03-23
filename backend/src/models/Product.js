import mongoose from 'mongoose';



const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required:true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }, 
    category: {
        type: String, 
        required: true,
        enum: ['supplements', 'apparel', 'equipment', 'accessories']
    },
    imageURL: {
        type: String,
        required: true
    }, 
    stock: {
        type: Number, 
        required: true,
        min: 0,
        default: 0
    },
    featured: {
        type: Boolean,
        default: false
    }, 
    discount: {
        type: Number, 
        min: 0,
        default: 0,
        max: 100,
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;