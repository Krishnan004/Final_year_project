const express = require('express');
const router = express.Router();
const db = require("../database/db"); // Ensure the correct path

// POST route to add ewaste selling details
router.post('/', (req, res) => {
    const { place, selling_item, name, contactnumber, email, city, address, userid } = req.body;

    if (!place || !selling_item || !name || !contactnumber || !email || !city || !address || !userid) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `INSERT INTO ewaste_selling_detail 
                   (place, selling_item, name, contactnumber, email, city, address, userid, created_at)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`;

    db.query(query, [place, selling_item, name, contactnumber, email, city, address, userid], (err, result) => {
        if (err) {
            console.error("Database Insert Error:", err);
            return res.status(500).json({ message: 'Error inserting data into database', error: err });
        }
        res.status(201).json({ message: 'Record added successfully', data: result });
    });
});

// GET route to fetch all ewaste selling details
router.get('/', (req, res) => {
    const query = 'SELECT * FROM ewaste_selling_detail';

    db.query(query, (err, result) => {
        if (err) {
            console.error("Database Fetch Error:", err);
            return res.status(500).json({ message: 'Error fetching data from database', error: err });
        }
        res.status(200).json({ data: result });
    });
});

module.exports = router;
