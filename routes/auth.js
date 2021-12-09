//rutas para autenticar usuarios
const express = require('express');
const router =express.Router();
const {check}=require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//iniciar sesion
// /api/auth
router.post('/',
    [
        check('email', 'agrega un email valido').isEmail(),
        check('password','el password debe ser miniimo de 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
);

//obtiene usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;