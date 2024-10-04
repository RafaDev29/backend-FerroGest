const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { validateAuthDTO } = require('./auth.dto');

router.post('/login', validateAuthDTO, authController.login);

module.exports = router;
