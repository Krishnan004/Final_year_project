const mysql = require('mysql')

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"mobilespec",
    port:"3300"
})

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('Connected to the MySQL database.');
});

// Export the connection
module.exports = db;