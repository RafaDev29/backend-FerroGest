const express = require('express');
const router = express.Router();
const warehouseEntryController = require('./warehouseEntries.controller');
const { validateWarehouseEntryDTO } = require('./warehouseEntries.dto');
const jwtMiddleware = require('../auth/jwt/jwtMiddleware');


router.post('/warehouse-entries', jwtMiddleware, validateWarehouseEntryDTO, warehouseEntryController.createWarehouseEntry);


router.get('/warehouse-entries', jwtMiddleware, warehouseEntryController.listWarehouseEntries);

module.exports = router;
