const supplierService = require('./suppliers.service');

const createSupplier = async (req, res) => {
    try {
        const { name, contact, address, phone, email } = req.body;
        const newSupplier = await supplierService.createSupplier({ name, contact, address, phone, email });
        res.success('Supplier created successfully', newSupplier);
    } catch (error) {
        res.error(error);
    }
};

const listSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.listSuppliers();
        res.success('Suppliers retrieved successfully', suppliers);
    } catch (error) {
        res.error(error);
    }
};

module.exports = { createSupplier, listSuppliers };
