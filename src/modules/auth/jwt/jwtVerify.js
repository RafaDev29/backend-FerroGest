const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject('Invalid token');
            }
            resolve(decoded);
        });
    });
};

module.exports = verifyToken;
