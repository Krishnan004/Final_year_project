const express = require('express');
const router = express.Router();
const db = require('../database/db');
const util = require('util');
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken'); // Import JWT
const checkAuth = require('../middleware/auth'); // Import auth middleware
require('dotenv').config(); // Load environment variables

const queryAsync = util.promisify(db.query).bind(db);

// POST endpoint to insert new user details (Signup)
router.post("/signup", async (req, res) => {
    const { username, emailid, password } = req.body;

    if (!username || !emailid || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the email already exists
        const checkQuery = "SELECT * FROM user WHERE emailid = ?";
        const existingUsers = await queryAsync(checkQuery, [emailid]);

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email already exists. Please log in instead.' });
        }

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const insertQuery = "INSERT INTO user (username, emailid, password) VALUES (?, ?, ?)";
        const values = [username, emailid, hashedPassword];

        const result = await queryAsync(insertQuery, values);

        res.status(201).json({ 
            message: 'User signed up successfully',
            userId: result.insertId
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to sign up user details.' });
    }
});

// POST endpoint for user login
router.post("/login", async (req, res) => {
    const { emailid, password } = req.body;

    if (!emailid || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Check if the user exists
        const query = "SELECT * FROM user WHERE emailid = ?";
        const users = await queryAsync(query, [emailid]);

        if (users.length === 0) {
            return res.status(400).json({ message: 'Email does not exist. Please sign up.' });
        }

        const user = users[0];

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.emailid },
            process.env.JWT_SECRET, // Store the secret key in a .env file
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: 'User logged in successfully',
            userId: user.id,
            emailid: user.emailid,
            token // Send JWT token to the client
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to log in user.' });
    }
});

// GET endpoint to fetch user profile (Protected Route)
router.get('/profile', checkAuth, async (req, res) => {
    try {
        const userId = req.user.userId;

        // Fetch user data from the database
        const query = "SELECT id, username, emailid FROM user WHERE id = ?";
        const users = await queryAsync(query, [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ user: users[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch user profile.' });
    }
});

router.get('/byid', (req, res) => {
    const { id } = req.query; // Use query params instead of body

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    const query = "SELECT * FROM user WHERE id=?";
    db.query(query, [id], (err, data) => {  // Pass id as an array
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch user details.' });
        }
        res.json(data.length ? data[0] : { message: 'User not found' }); // Return first user or "not found"
    });
});

module.exports = router;
