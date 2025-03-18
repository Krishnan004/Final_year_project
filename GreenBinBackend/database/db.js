const mysql = require('mysql2')

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"mobilespec"
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