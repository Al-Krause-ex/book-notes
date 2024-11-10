import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';
import { authenticateToken } from '../middleware/auth.mjs';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create(username, email, password);
        res.status(201).json({ message: 'User registered succesfully', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'User registration failed' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.authenticate(email, password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        //Generate JWT Token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByEmail(req.user.email);
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve profile' });
    }
});

export default router;
