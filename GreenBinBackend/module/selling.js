const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Ensure database connection is correctly set up

// POST: Insert new selling product details
router.post('/', (req, res) => {
    const {
        user_id,
        user_email,
        call_ability,
        touchscreen_working,
        original_screen,
        no_broken_screen,
        no_dead_spot,
        no_scratch_dent,
        no_panel_missing,
        front_camera_working,
        back_camera_working,
        volume_button_working,
        wifi_working,
        finger_touch_working,
        battery_service,
        battery_health_80_85,
        no_speaker_faulty,
        charging_port_working,
        power_button_working,
        face_sensor_working,
        silent_button_working,
        audio_receiver_working,
        no_camera_glass_broken,
        bluetooth_working,
        vibrator_working,
        microphone_working,
        proximity_sensor_working,
        phone_box,
        original_charger
    } = req.body;

    const query = `
        INSERT INTO selling_product_details (
            user_id, user_email, call_ability, touchscreen_working, original_screen, 
            no_broken_screen, no_dead_spot, no_scratch_dent, no_panel_missing, 
            front_camera_working, back_camera_working, volume_button_working, wifi_working, 
            finger_touch_working, battery_service, battery_health_80_85, no_speaker_faulty, 
            charging_port_working, power_button_working, face_sensor_working, silent_button_working, 
            audio_receiver_working, no_camera_glass_broken, bluetooth_working, vibrator_working, 
            microphone_working, proximity_sensor_working, phone_box, original_charger
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        user_id,
        user_email,
        call_ability,
        touchscreen_working,
        original_screen,
        no_broken_screen,
        no_dead_spot,
        no_scratch_dent,
        no_panel_missing,
        front_camera_working,
        back_camera_working,
        volume_button_working,
        wifi_working,
        finger_touch_working,
        battery_service,
        battery_health_80_85,
        no_speaker_faulty,
        charging_port_working,
        power_button_working,
        face_sensor_working,
        silent_button_working,
        audio_receiver_working,
        no_camera_glass_broken,
        bluetooth_working,
        vibrator_working,
        microphone_working,
        proximity_sensor_working,
        phone_box,
        original_charger
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to create selling product details.' });
        }

        res.status(201).json({
            message: 'Product details added successfully',
            id: result.insertId // Return the inserted ID
        });
    });
});

// POST: Insert address details
router.post('/address', (req, res) => {
    const {
        userid,
        order_id,
        address,
        pincode,
        locality, // Optional
        upid,
        alternate_phonenumber // Optional
    } = req.body;

    const query = `
        INSERT INTO address_detail_cus (userid, order_id, address, pincode, locality, upid, alternate_phonenumber) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        userid,
        order_id,
        address,
        pincode,
        locality || null, // Handle optional field
        upid,
        alternate_phonenumber || null // Handle optional field
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to add address details.' });
        }

        res.status(201).json({ 
            message: 'Address details added successfully', 
            id: result.insertId // Returning the inserted ID
        });
    });
});

// GET: Fetch all selling product details
router.get('/condition', (req, res) => {
    const { id } = req.query; // Extract id from query params

    if (!id) {
        return res.status(400).json({ message: 'Order ID is required' });
    }

    const query = "SELECT * FROM selling_product_details WHERE id=?";
    db.query(query, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch selling product details.' });
        }
        res.json(data.length ? data : { message: 'No products found for this order' });
    });
});


router.get('/orderplaced', (req, res) => {
    const query = "SELECT * FROM address_detail_cus"; // Ensure the table name matches case

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch selling product details.' });
        }
        res.json(data);
    });
});

module.exports = router;
