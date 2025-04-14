import User from '../models/User.js';
import { generateTokens } from '../middleware/authMiddleware.js';



// Register new user
export const signup = async (req, res) => {
    try {
        const { username, password, confirmPassword, email, firstName, lastName } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email ? 'Email already exists' : 'Username already exists'
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
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

// Register new admin user
export const signupAdmin = async (req, res) => {
    try {
        const { username, password, confirmPassword, email, firstName, lastName, adminSecret } = req.body;

        // Verify admin secret - in a real app, use a strong secret from env variables
        const secretKey = process.env.ADMIN_SECRET_KEY || 'admin-secret-key';
        if (adminSecret !== secretKey) {
            return res.status(403).json({ message: 'Invalid admin secret key' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email ? 'Email already exists' : 'Username already exists'
            });
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Create new admin user and save
        const user = await new User({ 
            username, 
            password, 
            email, 
            firstName, 
            lastName,
            isAdmin: true // Set admin flag to true
        }).save();

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({
            message: 'Admin user registered successfully',
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                isAdmin: user.isAdmin 
            },
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering admin user', error: error.message });
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
            user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin },
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
