const express = require('express');
const router = express.Router();
const administratorController = require('./administrator.controller');
const { validateAdministratorDTO } = require('./administrator.dto');
const jwtMiddleware = require('../auth/jwt/jwtMiddleware');


router.post('/administrators', jwtMiddleware, validateAdministratorDTO, administratorController.createAdministrator);


router.get('/administrators', jwtMiddleware, administratorController.listAdministrators);

module.exports = router;
