const express = require('express');
const router = express.Router();
const clerkController = require('./clerks.controller');
const { validateClerkDTO } = require('./clerks.dto');
const jwtMiddleware = require('../auth/jwt/jwtMiddleware');

// Ruta para crear un nuevo warehouse clerk (requiere autenticación y rol de administrador)
router.post('/clerks', jwtMiddleware, validateClerkDTO, clerkController.createClerk);

// Ruta para listar todos los warehouse clerks de un administrador (requiere autenticación)
router.get('/clerks', jwtMiddleware, clerkController.listClerks);

module.exports = router;
