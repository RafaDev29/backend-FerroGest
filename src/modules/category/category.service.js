const { connection } = require('../../config/db');

const createCategory = ({ name, description }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO tb_categories (name, description) VALUES (?, ?)';
        connection.query(query, [name, description], (err, result) => {
            if (err) {
                return reject('Error creating category');
            }

            resolve({
                id: result.insertId,
                name,
                description
            });
        });
    });
};

const listCategories = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, name, description FROM tb_categories';
        connection.query(query, (err, results) => {
            if (err) {
                return reject('Error fetching categories');
            }

            resolve(results);
        });
    });
};

module.exports = { createCategory, listCategories };
