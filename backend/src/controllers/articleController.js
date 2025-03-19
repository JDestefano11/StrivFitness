import Article from '../models/Article.js';

// Create a new article
export const createArticle = async (req, res) => {
    try {
        const { title, content, category, tags, imageUrl, published } = req.body;

        // Set the author to the current user
        const author = req.user._id;

        // Set publish date if article is published
        const publishDate = published ? new Date() : null;

        const article = new Article({
            title,
            content,
            author,
            category,
            tags,
            imageUrl,
            published,
            publishDate
        });

        await article.save();

        res.status(201).json({
            message: 'Article created successfully',
            article
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating article',
            error: error.message
        });
    }
};

// Get all articles (with optional filtering)
export const getAllArticles = async (req, res) => {
    try {
        const { category, published, author } = req.query;

        // Build filter object
        const filter = {};
        if (category) filter.category = category;
        if (published !== undefined) filter.published = published === 'true';
        if (author) filter.author = author;

        // If not admin and requesting all articles, only show published ones
        if (!req.user?.isAdmin && !req.query.adminView) {
            filter.published = true;
        }

        const articles = await Article.find(filter)
            .populate('author', 'username firstName lastName')
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: articles.length,
            articles
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching articles',
            error: error.message
        });
    }
};

// Get a single article by ID
export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
            .populate('author', 'username firstName lastName');

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // If article is not published and user is not admin, deny access
        if (!article.published && (!req.user || !req.user.isAdmin)) {
            return res.status(403).json({ message: 'Access denied. Article not published.' });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching article',
            error: error.message
        });
    }
};

// Update an article (admin only)
export const updateArticle = async (req, res) => {
    try {
        const { title, content, category, tags, imageUrl, published } = req.body;

        // Find the article
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Update publish date if publishing for the first time
        const publishDate = !article.published && published ? new Date() : article.publishDate;

        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                category,
                tags,
                imageUrl,
                published,
                publishDate
            },
            { new: true }
        ).populate('author', 'username firstName lastName');

        res.status(200).json({
            message: 'Article updated successfully',
            article: updatedArticle
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating article',
            error: error.message
        });
    }
};

// Delete an article (admin only)
export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        await Article.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting article',
            error: error.message
        });
    }
};