const express = require('express');
const router = express.Router();
const supplierController = require('./suppliers.controller');
const { validateSupplierDTO } = require('./suppliers.dto');
const jwtMiddleware = require('../auth/jwt/jwtMiddleware');

router.post('/suppliers', jwtMiddleware, validateSupplierDTO, supplierController.createSupplier);


router.get('/suppliers', jwtMiddleware, supplierController.listSuppliers);

module.exports = router;
