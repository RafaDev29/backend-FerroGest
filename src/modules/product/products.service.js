const { connection } = require('../../config/db');

const createProduct = ({ name, description, category_id, unit_of_measure, quantity_available, reorder_point, supplier_id }) => {
    return new Promise((resolve, reject) => {
        // Verificar si la categoría existe
        const categoryQuery = 'SELECT id FROM tb_categories WHERE id = ?';
        connection.query(categoryQuery, [category_id], (err, categoryResults) => {
            if (err || categoryResults.length === 0) {
                return reject('Invalid category ID');
            }

            // Verificar si el proveedor existe
            const supplierQuery = 'SELECT id FROM tb_suppliers WHERE id = ?';
            connection.query(supplierQuery, [supplier_id], (err, supplierResults) => {
                if (err || supplierResults.length === 0) {
                    return reject('Invalid supplier ID');
                }

                // Insertar el producto en tb_products
                const query = `
                    INSERT INTO tb_products (name, description, category_id, unit_of_measure, quantity_available, reorder_point, supplier_id, registration_date, update_date)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const registrationDate = new Date().toISOString().split('T')[0];
                const updateDate = registrationDate;

                connection.query(
                    query,
                    [name, description, category_id, unit_of_measure, quantity_available, reorder_point, supplier_id, registrationDate, updateDate],
                    (err, result) => {
                        if (err) {
                            return reject('Error creating product');
                        }

                        resolve({
                            id: result.insertId,
                            name,
                            description,
                            category_id,
                            unit_of_measure,
                            quantity_available,
                            reorder_point,
                            supplier_id,
                            registration_date: registrationDate,
                            update_date: updateDate
                        });
                    }
                );
            });
        });
    });
};

const listProducts = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT p.id, p.name, p.description, p.category_id, p.unit_of_measure, p.quantity_available, p.reorder_point, p.supplier_id,
                   p.registration_date, p.update_date, c.name AS category_name, s.name AS supplier_name
            FROM tb_products p
            LEFT JOIN tb_categories c ON p.category_id = c.id
            LEFT JOIN tb_suppliers s ON p.supplier_id = s.id
        `;

        connection.query(query, (err, results) => {
            if (err) {
                return reject('Error fetching products');
            }

            resolve(results);
        });
    });
};

module.exports = { createProduct, listProducts };
