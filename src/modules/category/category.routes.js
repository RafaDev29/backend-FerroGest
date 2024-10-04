const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');
const { validateCategoryDTO } = require('./category.dto');
const jwtMiddleware = require('../auth/jwt/jwtMiddleware');


router.post('/categories', jwtMiddleware, validateCategoryDTO, categoryController.createCategory);


router.get('/categories', jwtMiddleware, categoryController.listCategories);

module.exports = router;
