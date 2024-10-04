const { connection } = require('../../config/db');

const createAdministrator = ({ username, password, name, hire_date, contact_phone }) => {
    return new Promise((resolve, reject) => {
        // Crear el usuario en tb_users
        const userQuery = 'INSERT INTO tb_users (name, username, password, role) VALUES (?, ?, ?, ?)';
        connection.query(userQuery, [name, username, password, 'administrator'], (err, userResult) => {
            if (err) {
                return reject('Error creating user');
            }

            const userId = userResult.insertId;

            // Crear el administrador en tb_administrators
            const adminQuery = 'INSERT INTO tb_administrators (user_id, hire_date, contact_phone) VALUES (?, ?, ?)';
            connection.query(adminQuery, [userId, hire_date, contact_phone], (err, adminResult) => {
                if (err) {
                    return reject('Error creating administrator');
                }

                resolve({
                    user_id: userId,
                    hire_date,
                    contact_phone
                });
            });
        });
    });
};

const listAdministrators = () => {
    return new Promise((resolve, reject) => {
        // Consulta para obtener todos los administradores
        const query = `
            SELECT a.id, a.user_id, a.hire_date, a.contact_phone, u.name, u.username
            FROM tb_administrators a
            JOIN tb_users u ON a.user_id = u.id
            WHERE u.role = 'administrator'
        `;

        connection.query(query, (err, results) => {
            if (err) {
                return reject('Error fetching administrators');
            }
            resolve(results);
        });
    });
};

module.exports = { createAdministrator, listAdministrators };
