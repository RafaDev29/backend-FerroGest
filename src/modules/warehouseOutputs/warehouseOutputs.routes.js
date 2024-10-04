const express = require('express');
const router = express.Router();
const warehouseOutputController = require('./warehouseOutputs.controller');
const { validateWarehouseOutputDTO } = require('./warehouseOutputs.dto');
const jwtMiddleware = require('../auth/jwt/jwtMiddleware');


router.post('/warehouse-outputs', jwtMiddleware, validateWarehouseOutputDTO, warehouseOutputController.createWarehouseOutput);


router.get('/warehouse-outputs', jwtMiddleware, warehouseOutputController.listWarehouseOutputs);

module.exports = router;
