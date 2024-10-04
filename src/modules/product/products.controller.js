const productService = require('./products.service');

const createProduct = async (req, res) => {
    try {
        const { name, description, category_id, unit_of_measure, quantity_available, reorder_point, supplier_id } = req.body;
        const newProduct = await productService.createProduct({ name, description, category_id, unit_of_measure, quantity_available, reorder_point, supplier_id });
        res.success('Product created successfully', newProduct);
    } catch (error) {
        res.error(error);
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await productService.listProducts();
        res.success('Products retrieved successfully', products);
    } catch (error) {
        res.error(error);
    }
};

module.exports = { createProduct, listProducts };
