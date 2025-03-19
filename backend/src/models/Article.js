import mongoose from 'mongoose';


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    imageUrl: {
        type: String,
        required: false,
        trim: true
    },
    published: {
        type: Boolean,
        default: false
    },
    publishDate: {
        type: Date,
    }
}, {
    timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

export default Article;