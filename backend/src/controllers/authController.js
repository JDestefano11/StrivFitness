import User from '../models/User.js';
import { generateTokens } from '../middleware/authMiddleware.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Configure email transporter 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your-email-password'
    }
});
// Register new user
export const signup = async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email ? 'Email already exists' : 'Username already exists'
            });
        }

        // Create new user and save
        const user = await new User({ username, password, email, firstName, lastName }).save();

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, username: user.username, email: user.email },
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user 
export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username && !email) {
            return res.status(400).json({ message: 'Username or email is required.' });
        }

        // Find user by username or email
        const user = await User.findOne(username ? { username } : { email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, username: user.username, email: user.email },
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required.' });
        }

        // Find user by refresh token and remove it
        const user = await User.findOne({ refreshToken });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error.message });
    }
}

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required.' });

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        // Generate reset token
        user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        // NOTE: Ensure FRONTEND_URL is set in production for the correct reset link
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${user.resetPasswordToken}`;

        // Send email with reset link
        await transporter.sendMail({
            to: user.email,
            from: process.env.EMAIL_FROM || 'noreply@strivfitness.com',
            subject: 'Password Reset Request',
            text: `Click the link to reset your password: ${resetUrl}\nIf you didn't request this, ignore it.`,
        });

        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending password reset email', error: error.message });
    }
};

// Forgot Username
export const forgotUsername = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found with this email.' });
        }

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_FROM || 'noreply@strivfitness.com',
            subject: 'Username Recovery Request',
            text: `
        Hello,

        You recently requested to recover your username.

        Your username is: ${user.username}

        If you did not request this, please ignore this email.

        Best regards,
        StrivFitness Team
      `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Username recovery email sent successfully.' });
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ message: 'Error sending recovery email', error: error.message });
    }
};
