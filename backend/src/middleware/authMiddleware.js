require('dotenv').config();
import jwt from 'jsonwebtoken';
import User from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

// generate JWT token
export const generateToken = (userId) => {
    const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
}

// verify JWT token
export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found.' });

        req.user = user;
        next();
    } catch (error) {
        const message = error.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';
        return res.status(401).json({ message, tokenExpired: error.name === 'TokenExpiredError' });
    }
};

// generate refresh token
export const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token is required.' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);

        // Ensure the user exists and that the refresh token matches the one stored in the database
        if (!user || user.refreshToken !== refreshToken)
            return res.status(401).json({ message: 'Invalid refresh token.' });

        const { accessToken, refreshToken: newRefreshToken } = generateToken(user._id);

        await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });

        res.json({ accessToken, refreshToken: newRefreshToken });
    } catch {
        res.status(401).json({ message: 'Invalid refresh token.' });
    }
};  