const { connection } = require('../../config/db');

const createWarehouseOutput = ({ product_id, output_date, quantity, destination, reference_document, user_id }) => {
    return new Promise((resolve, reject) => {
        // Verificar si el producto existe y si hay suficiente cantidad disponible
        const productQuery = 'SELECT id, quantity_available FROM tb_products WHERE id = ?';
        connection.query(productQuery, [product_id], (err, productResults) => {
            if (err || productResults.length === 0) {
                return reject('Invalid product ID');
            }

            const product = productResults[0];
            if (product.quantity_available < quantity) {
                return reject('Insufficient product quantity available');
            }

            // Insertar la salida de almacén en tb_warehouse_outputs
            const outputQuery = `
                INSERT INTO tb_warehouse_outputs (product_id, output_date, quantity, user_id, destination, reference_document)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            connection.query(outputQuery, [product_id, output_date, quantity, user_id, destination, reference_document], (err, result) => {
                if (err) {
                    return reject('Error creating warehouse output');
                }

                // Actualizar la cantidad disponible del producto
                const updateProductQuery = 'UPDATE tb_products SET quantity_available = quantity_available - ? WHERE id = ?';
                connection.query(updateProductQuery, [quantity, product_id], (err) => {
                    if (err) {
                        return reject('Error updating product quantity');
                    }

                    resolve({
                        id: result.insertId,
                        product_id,
                        output_date,
                        quantity,
                        user_id,
                        destination,
                        reference_document
                    });
                });
            });
        });
    });
};

const listWarehouseOutputs = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT o.id, o.product_id, o.output_date, o.quantity, o.user_id, o.destination, o.reference_document,
                   p.name AS product_name, p.description AS product_description, u.name AS user_name
            FROM tb_warehouse_outputs o
            LEFT JOIN tb_products p ON o.product_id = p.id
            LEFT JOIN tb_users u ON o.user_id = u.id
        `;

        connection.query(query, (err, results) => {
            if (err) {
                return reject('Error fetching warehouse outputs');
            }

            // Formatear la respuesta para incluir los detalles del producto y del usuario
            const formattedResults = results.map(output => ({
                id: output.id,
                output_date: output.output_date,
                quantity: output.quantity,
                user: {
                    user_id: output.user_id,
                    name: output.user_name,
                },
                destination: output.destination,
                reference_document: output.reference_document,
                product: {
                    product_id: output.product_id,
                    name: output.product_name,
                    description: output.product_description
                }
            }));

            resolve(formattedResults);
        });
    });
};

module.exports = { createWarehouseOutput, listWarehouseOutputs };
