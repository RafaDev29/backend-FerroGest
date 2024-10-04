const warehouseEntryService = require('./warehouseEntries.service');

const createWarehouseEntry = async (req, res) => {
    try {
        const { product_id, entry_date, quantity, supplier_id, reference_document } = req.body;
        const user_id = req.user.id;

        const newEntry = await warehouseEntryService.createWarehouseEntry({ product_id, entry_date, quantity, supplier_id, reference_document, user_id });
        res.success('Warehouse entry created successfully', newEntry);
    } catch (error) {
        res.error(error);
    }
};

const listWarehouseEntries = async (req, res) => {
    try {
        const entries = await warehouseEntryService.listWarehouseEntries();
        res.success('Warehouse entries retrieved successfully', entries);
    } catch (error) {
        res.error(error);
    }
};

module.exports = { createWarehouseEntry, listWarehouseEntries };
