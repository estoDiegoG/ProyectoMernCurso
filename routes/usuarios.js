//rutas para crear usuarios
const express = require('express');
const router =express.Router();
const usuarioController = require('../controllers/usuarioController')
const {check}=require('express-validator');

//crea un usuario
// /api/usuaior
router.post('/',
[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('email', 'agrega un email valido').isEmail(),
    check('password','el password debe ser miniimo de 6 caracteres').isLength({min:6})
],
usuarioController.crearUsuario                         
);

module.exports = router;