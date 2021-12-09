const express = require('express');
const router = express.Router();
const tareaController=require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check }=require('express-validator');

//crea un tarea
// /api/tareas
router.post('/',
    auth,
    [ 
        check('nombre','E; nombre es obligatorio').not().isEmpty(),
        check('nombre','E;proyecto es obligatotrio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//obtener tareas por proyuecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);

//actualizar tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
    )

    //eliminar tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports=router;