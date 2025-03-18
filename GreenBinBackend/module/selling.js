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
    const query = "SELECT * FROM address_detail_cus WHERE order_received != 1"; // Ensure the table name matches case

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch selling product details.' });
        }
        res.json(data);
    });
});

router.get('/orderreceived', (req, res) => {
    const query = "SELECT * FROM address_detail_cus WHERE order_received = 1"; // Ensure the table name matches case

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch selling product details.' });
        }
        res.json(data);
    });
});

router.get('/ewastereceived', (req, res) => {
    const query = "SELECT * FROM ewaste_selling_detail WHERE order_received = 1"; // Ensure the table name matches case

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch selling product details.' });
        }
        res.json(data);
    });
});

router.get('/ewaste', (req, res) => {
    const query = "select * from ewaste_selling_detail WHERE order_received != 1"; // Ensure the table name matches case

    db.query(query, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to fetch selling product details.' });
        }
        res.json(data);
    });
});

router.get('/employee_orders', (req, res) => {
    const query = `
        SELECT id, userid, address, pincode, locality, alternate_phonenumber
        FROM address_detail_cus
        WHERE order_confirm = 1 AND order_received = 0
    `;

    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching employee orders:", err);
            return res.status(500).json({ message: "Failed to fetch employee orders." });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "No confirmed orders found." });
        }

        res.json(data);
    });
});

router.get('/ewaste_orders', (req, res) => {
    const query = `
        SELECT *
        FROM ewaste_selling_detail
        WHERE order_confirm = 1 AND order_received = 0
    `;

    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching employee orders:", err);
            return res.status(500).json({ message: "Failed to fetch employee orders." });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "No confirmed orders found." });
        }

        res.json(data);
    });
});


router.put('/confirm', (req, res) => {
    const { order_confirm,id } = req.body;
    const query = "UPDATE address_detail_cus SET order_confirm = ? WHERE id = ?";

    db.query(query, [order_confirm,id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to update order confirmation.' });
        }
        res.json({ message: 'Order confirmed successfully', data });
    });
});

router.put('/confirm_ewaste', (req, res) => {
    const { order_confirm,id } = req.body;
    const query = "UPDATE ewaste_selling_detail SET order_confirm = ? WHERE id = ?";

    db.query(query, [order_confirm,id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to update order confirmation.' });
        }
        res.json({ message: 'Order confirmed successfully', data });
    });
});

router.put('/pickedup', (req, res) => {
    const { id } = req.body; // Only `id` is needed
    const query = "UPDATE address_detail_cus SET order_received = 1  WHERE id = ?";

    db.query(query, [id], (err, data) => {
        if (err) {
            console.error("Error updating order status:", err);
            return res.status(500).json({ message: "Failed to update order status." });
        }
        res.json({ message: "Order marked as received successfully", data });
    });
});

router.put('/pickedup_ewaste', (req, res) => {
    const { id } = req.body; // Only `id` is needed
    const query = "UPDATE ewaste_selling_detail SET order_received = 1  WHERE id = ?";

    db.query(query, [id], (err, data) => {
        if (err) {
            console.error("Error updating order status:", err);
            return res.status(500).json({ message: "Failed to update order status." });
        }
        res.json({ message: "Order marked as received successfully", data });
    });
});



module.exports = router;
