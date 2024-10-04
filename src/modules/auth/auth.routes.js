const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { validateAuthDTO } = require('./auth.dto');
const jwtMiddleware = require('./jwt/jwtMiddleware');

router.post('/login', validateAuthDTO, authController.login);
//router.get('/profile', jwtMiddleware, authController.getProfile);
module.exports = router;
