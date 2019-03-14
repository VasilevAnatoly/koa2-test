import mysql from "mysql";
import {
    promisify
} from 'util';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.query = promisify(connection.query);

connection.connect((err) => {
    if (err) {
        console.log('Error:' + err.message);
    } else {
        console.log("Database is connected ... ");
    }
});

module.exports = connection;