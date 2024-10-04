const { connection } = require('../../config/db');

const createWarehouseEntry = ({ product_id, entry_date, quantity, supplier_id, reference_document, user_id }) => {
    return new Promise((resolve, reject) => {
        // Verificar si el producto existe
        const productQuery = 'SELECT id FROM tb_products WHERE id = ?';
        connection.query(productQuery, [product_id], (err, productResults) => {
            if (err || productResults.length === 0) {
                return reject('Invalid product ID');
            }

            // Verificar si el proveedor existe
            const supplierQuery = 'SELECT id FROM tb_suppliers WHERE id = ?';
            connection.query(supplierQuery, [supplier_id], (err, supplierResults) => {
                if (err || supplierResults.length === 0) {
                    return reject('Invalid supplier ID');
                }

                // Insertar la entrada de almacén en tb_warehouse_entries
                const query = `
                    INSERT INTO tb_warehouse_entries (product_id, entry_date, quantity, supplier_id, user_id, reference_document)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                connection.query(
                    query,
                    [product_id, entry_date, quantity, supplier_id, user_id, reference_document],
                    (err, result) => {
                        if (err) {
                            return reject('Error creating warehouse entry');
                        }

                        resolve({
                            id: result.insertId,
                            product_id,
                            entry_date,
                            quantity,
                            supplier_id,
                            user_id,
                            reference_document
                        });
                    }
                );
            });
        });
    });
};

const listWarehouseEntries = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT e.id, e.product_id, e.entry_date, e.quantity, e.supplier_id, e.user_id, e.reference_document,
                   p.name AS product_name, p.description AS product_description, p.unit_of_measure, p.quantity_available, p.reorder_point,
                   c.id AS category_id, c.name AS category_name, c.description AS category_description,
                   s.name AS supplier_name, u.name AS user_name
            FROM tb_warehouse_entries e
            LEFT JOIN tb_products p ON e.product_id = p.id
            LEFT JOIN tb_categories c ON p.category_id = c.id
            LEFT JOIN tb_suppliers s ON e.supplier_id = s.id
            LEFT JOIN tb_users u ON e.user_id = u.id
        `;

        connection.query(query, (err, results) => {
            if (err) {
                return reject('Error fetching warehouse entries');
            }

            // Formatear la respuesta para incluir los detalles del producto dentro de un objeto
            const formattedResults = results.map(entry => ({
                id: entry.id,
                entry_date: entry.entry_date,
                quantity: entry.quantity,
                supplier: {
                    supplier_id: entry.supplier_id,
                    name: entry.supplier_name,
                },
                user: {
                    user_id: entry.user_id,
                    name: entry.user_name,
                },
                reference_document: entry.reference_document,
                product: {
                    product_id: entry.product_id,
                    name: entry.product_name,
                    description: entry.product_description,
                    unit_of_measure: entry.unit_of_measure,
                    quantity_available: entry.quantity_available,
                    reorder_point: entry.reorder_point,
                    category: {
                        category_id: entry.category_id,
                        name: entry.category_name,
                        description: entry.category_description,
                    }
                }
            }));

            resolve(formattedResults);
        });
    });
};

module.exports = { createWarehouseEntry, listWarehouseEntries };


module.exports = { createWarehouseEntry, listWarehouseEntries };
