const { connection } = require('../../config/db');

const createSupplier = ({ name, contact, address, phone, email }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO tb_suppliers (name, contact, address, phone, email) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [name, contact, address, phone, email], (err, result) => {
            if (err) {
                return reject('Error creating supplier');
            }

            resolve({
                id: result.insertId,
                name,
                contact,
                address,
                phone,
                email
            });
        });
    });
};

const listSuppliers = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, name, contact, address, phone, email FROM tb_suppliers';
        connection.query(query, (err, results) => {
            if (err) {
                return reject('Error fetching suppliers');
            }

            resolve(results);
        });
    });
};

module.exports = { createSupplier, listSuppliers };
