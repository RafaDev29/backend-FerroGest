const { connection } = require('../../config/db');
const generateToken = require('./jwt/jwtGenerate');
require('dotenv').config();

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM tb_users WHERE username = ? AND password = ?';

        connection.query(query, [username, password], (err, results) => {
            if (err) {
                return reject('Database error');
            }

            if (results.length === 0) {
                return resolve(null);
            }
            const user = results[0];

            const token = generateToken({
                id: user.id,
                username: user.username,
                role: user.role,
            });

            resolve({
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
                token: token
            });
        });
    });
};

module.exports = { login };
