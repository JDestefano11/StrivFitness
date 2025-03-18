import User from '../models/User.js';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

// Configure SendGrid if API key is available and valid
const isValidSendGridKey = process.env.SENDGRID_API_KEY && process.env.SENDGRID_API_KEY.startsWith('SG.');
if (isValidSendGridKey) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} 

// Generate a random token
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Send email using SendGrid
const sendEmail = async (to, subject, text) => {
    if (!isValidSendGridKey) {
        // For development purposes only
        return true;
    }

    const msg = {
        to,
        from: process.env.EMAIL_FROM || 'noreply@strivfitness.com',
        subject,
        text
    };

    try {
        await sgMail.send(msg);
        return true;
    } catch (error) {
        return false;
    }
};

// Forgot Username
export const forgotUsername = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No account found with that email' });
        }

        // Send email with username
        const emailSent = await sendEmail(
            user.email,
            'Your StrivFitness Username',
            `You are receiving this because you (or someone else) requested your username for your StrivFitness account.\n\n` +
            `Your username is: ${user.username}\n\n` +
            `If you did not request this, please ignore this email.`
        );

        if (!emailSent) {
            return res.status(500).json({ message: 'Error sending email' });
        }

        res.status(200).json({ message: 'Username sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving username', error: error.message });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No account found with that email' });
        }

        // Generate token for password reset
        const token = generateToken();
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Create reset URL (this would be your frontend URL)
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`;

        // Send email with reset link
        const emailSent = await sendEmail(
            user.email,
            'StrivFitness Password Reset',
            `You are receiving this because you (or someone else) requested the reset of the password for your StrivFitness account.\n\n` +
            `Please click on the following link, or paste it into your browser to complete the process:\n\n` +
            `${resetUrl}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.`
        );

        if (!emailSent) {
            return res.status(500).json({ message: 'Error sending email' });
        }

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ message: 'Token and password are required' });
        }

        // Find user with the given token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        // Set the new password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};
