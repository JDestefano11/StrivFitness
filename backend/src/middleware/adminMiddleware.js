// Check if user is an admin
export const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
};