const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors({
    origin: [
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],  
    credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Import your routes
const mobile = require('./module/mobile');
const selling = require('./module/selling');
const userAuth = require('./module/userAuth');
const adminAuth = require('./module/adminAuth');
const ewaste = require('./module/ewaste')

// Use your routes
app.use("/mobile", mobile);
app.use("/selling", selling);
app.use("/userauth",userAuth);
app.use("/adminauth",adminAuth);
app.use("/ewaste",ewaste);

// Error handling middleware (catch any errors thrown)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
    console.log(`Backend is running successfully on port ${port}`);
});
