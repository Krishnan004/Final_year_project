const express = require('express')
const router=express.Router();
const db = require("../database/db")

router.get("/brand", (req, res) => {
    const q = "SELECT DISTINCT brand FROM mobile_specs"; // Fetch unique brands

    db.query(q, (err, data) => {
        if (err) {
            console.error("Failed to fetch the mobile brands:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        // Extracting brand names into an array
        const brands = data.map(item => item.brand);
        return res.json(brands);
    });
});


router.get("/", (req, res) => {
    const { brand } = req.query; // Use req.query for GET request
    const q = "SELECT * FROM mobile_specs WHERE brand = ?";

    db.query(q, [brand], (err, data) => {
        if (err) {
            console.error("Failed to fetch the mobile specifications", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    });
});


module.exports = router;

