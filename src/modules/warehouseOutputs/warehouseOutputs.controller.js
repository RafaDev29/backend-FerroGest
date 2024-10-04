

const warehouseOutputService = require('./warehouseOutputs.service');

const createWarehouseOutput = async (req, res) => {
    try {
        const { product_id, output_date, quantity, destination, reference_document } = req.body;
        const user_id = req.user.id;

        const newOutput = await warehouseOutputService.createWarehouseOutput({ product_id, output_date, quantity, destination, reference_document, user_id });
        res.success('Warehouse output created successfully', newOutput);
    } catch (error) {
        res.error(error);
    }
};

const listWarehouseOutputs = async (req, res) => {
    try {
        const outputs = await warehouseOutputService.listWarehouseOutputs();
        res.success('Warehouse outputs retrieved successfully', outputs);
    } catch (error) {
        res.error(error);
    }
};

module.exports = { createWarehouseOutput, listWarehouseOutputs };
