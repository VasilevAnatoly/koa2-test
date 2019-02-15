var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function (err) {
    if (err) {
        console.log('Error:' + err.message);
    } else {
        console.log("Database is connected ... ");
    }
});

module.exports = connection;