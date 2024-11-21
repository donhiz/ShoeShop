const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have User model defined as `user.js`
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check password (assuming you have hashed passwords)
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = password === user.password;
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const oneMonthInSeconds = 30 * 24 * 60 * 60;
        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, accessLevel: user.accessLevel }, // Payload
            process.env.SECRET, // Secret key (should be stored securely)
            { expiresIn: oneMonthInSeconds } // Expiration time for token
        );

        res.json({ token }); // Send token back to user
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
