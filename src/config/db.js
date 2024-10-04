const mysql = require('mysql2');
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const connect = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
        } else {
            console.log('Connected to the MySQL database');
        }
    });
};

module.exports = { connect, connection };
