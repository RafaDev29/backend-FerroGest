const { connection } = require('../../config/db');

const createClerk = ({ username, password, name, hire_date, shift, contact_phone, address }, administratorId) => {
    return new Promise((resolve, reject) => {
        // Verificar que el administrador existe y obtener su ID
        const adminQuery = 'SELECT id FROM tb_administrators WHERE user_id = ?';
        connection.query(adminQuery, [administratorId], (err, adminResults) => {
            if (err) {
                return reject('Database error when checking administrator');
            }

            if (adminResults.length === 0) {
                return reject('Only administrators can create warehouse clerks');
            }

            const adminId = adminResults[0].id;

            // Crear el usuario en tb_users
            const userQuery = 'INSERT INTO tb_users (name, username, password, role) VALUES (?, ?, ?, ?)';
            connection.query(userQuery, [name, username, password, 'warehouse_clerk'], (err, userResult) => {
                if (err) {
                    return reject('Error creating user');
                }

                const userId = userResult.insertId;

                // Crear el warehouse clerk en tb_warehouse_clerks
                const clerkQuery = 'INSERT INTO tb_warehouse_clerks (user_id, administrator_id, hire_date, shift, contact_phone, address) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(clerkQuery, [userId, adminId, hire_date, shift, contact_phone, address], (err, clerkResult) => {
                    if (err) {
                        // Si ocurre un error aquí, el usuario ya fue creado, pero el clerk no, por lo que debería haber una lógica para eliminar el usuario
                        const deleteUserQuery = 'DELETE FROM tb_users WHERE id = ?';
                        connection.query(deleteUserQuery, [userId], (deleteErr) => {
                            if (deleteErr) {
                                return reject('Error creating clerk, and failed to clean up user');
                            }
                            return reject('Error creating warehouse clerk');
                        });
                    } else {
                        // Si se crea exitosamente, resolver con los datos del clerk
                        resolve({
                            user_id: userId,
                            administrator_id: adminId,
                            hire_date,
                            shift,
                            contact_phone,
                            address
                        });
                    }
                });
            });
        });
    });
};
const listClerks = (userId) => {
    return new Promise((resolve, reject) => {
        // Primero, obtener el ID del administrador usando el user_id del token
        const adminQuery = 'SELECT id FROM tb_administrators WHERE user_id = ?';

        connection.query(adminQuery, [userId], (err, adminResults) => {
            if (err) {
                console.error('Error fetching administrator ID:', err.message);
                return reject('Error fetching administrator ID');
            }

            if (adminResults.length === 0) {
              
                return reject('User is not an administrator');
            }

            const administratorId = adminResults[0].id;

            // Ahora, consultar todos los clerks que pertenezcan a este administrador
            const query = `
                SELECT c.id, c.user_id, c.administrator_id, c.hire_date, c.shift, c.contact_phone, c.address, u.name, u.username
                FROM tb_warehouse_clerks c
                JOIN tb_users u ON c.user_id = u.id
                WHERE c.administrator_id = ?
            `;

            console.log(`Attempting to fetch clerks for administrator_id: ${administratorId}`);

            connection.query(query, [administratorId], (err, results) => {
                if (err) {
                    console.error('Error fetching warehouse clerks:', err.message);
                    return reject('Error fetching warehouse clerks');
                }

                if (results.length === 0) {
                    console.log('No warehouse clerks found for administrator_id:', administratorId);
                    return resolve([]); // Devolver una lista vacía si no se encuentran registros
                }

                console.log('Warehouse clerks found:', results);
                resolve(results);
            });
        });
    });
};


module.exports = { createClerk, listClerks };
