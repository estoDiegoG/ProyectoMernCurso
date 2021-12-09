const express = require('express');
const router = express.Router();
const proyectoController=require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const { check }=require('express-validator');

//crea un proycto
// /api/proyectos

router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

//obtener los proyetos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

//actualizarProyectos via ID
router.put('/:id',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//eliminar proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyecto
);


module.exports=router;