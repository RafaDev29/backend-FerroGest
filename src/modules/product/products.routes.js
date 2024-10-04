const express = require('express');
const router = express.Router();
const productController = require('./products.controller');
const { validateProductDTO } = require('./products.dto');
const jwtMiddleware = require('../auth/jwt/jwtMiddleware');


router.post('/products', jwtMiddleware, validateProductDTO, productController.createProduct);


router.get('/products', jwtMiddleware, productController.listProducts);

module.exports = router;
