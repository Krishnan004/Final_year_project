const express = require('express');
const router = express.Router();
const db = require('../database/db');
const util = require('util');
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken'); // Import JWT
const checkAuth = require('../middleware/auth'); // Import auth middleware for protected routes
require('dotenv').config(); // Load environment variables

const queryAsync = util.promisify(db.query).bind(db);

// POST endpoint to insert new admin details (SignUp)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if the email already exists
        const checkQuery = "SELECT * FROM admin WHERE email = ?";
        const existingAdmins = await queryAsync(checkQuery, [email]);

        if (existingAdmins.length > 0) {
            return res.status(400).json({ message: 'Email already exists. Please log in instead.' });
        }

        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new admin
        const insertQuery = "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)";
        const values = [name, email, hashedPassword];

        const result = await queryAsync(insertQuery, values);

        res.status(201).json({ 
            message: 'Admin signed up successfully',
            adminId: result.insertId
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to sign up admin.' });
    }
});

// POST endpoint for admin login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Check if the admin exists
        const query = "SELECT * FROM admin WHERE email = ?";
        const admins = await queryAsync(query, [email]);

        if (admins.length === 0) {
            return res.status(400).json({ message: 'Email does not exist. Please sign up.' });
        }

        const admin = admins[0];

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { adminId: admin.id, email: admin.email },
            process.env.JWT_SECRET, // Store the secret key in a .env file
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json({
            message: 'Admin logged in successfully',
            adminId: admin.id,
            email: admin.email,
            token // Send JWT token to the client
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to log in admin.' });
    }
});

// GET endpoint to fetch admin profile (Protected Route)
router.get('/profile', checkAuth, async (req, res) => {
    try {
        const adminId = req.user.adminId;

        // Fetch admin data from the database
        const query = "SELECT id, name, email FROM admin WHERE id = ?";
        const admins = await queryAsync(query, [adminId]);

        if (admins.length === 0) {
            return res.status(404).json({ message: 'Admin not found.' });
        }

        res.status(200).json({ admin: admins[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch admin profile.' });
    }
});

// GET endpoint to fetch admin by ID
router.get('/byid', (req, res) => {
    const { id } = req.query; // Use query params instead of body

    if (!id) {
        return res.status(400).json({ message: 'Admin ID is required' });
    }

    const query = "SELECT * FROM admin WHERE id=?";
    db.query(query, [id], (err, data) => {  // Pass id as an array
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch admin details.' });
        }
        res.json(data.length ? data[0] : { message: 'Admin not found' }); // Return first admin or "not found"
    });
});

module.exports = router;
