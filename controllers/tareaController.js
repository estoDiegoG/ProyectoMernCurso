const Tarea = require('../models/tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult}=require('express-validator');

//crea una nueva tarea
exports.crearTarea=async (req,res)=>{

    //revisar si hay errores
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()});
    }

    
    try {
        //extraer el proeycto y comprobar que existe
        const {proyecto}=req.body;
        //revisar si existe
        const existeProyecto=await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'proyecto no encontrado'})
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg: 'no autorizado'});
        }

        //crear la tarea
        const tarea=new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send( 'hubo un error');
    }

}
//obtener tareas pro proyecto
exports.obtenerTareas=async (req, res)=>{

    //extraer proyecto
    try {
        //extraer el proeycto y comprobar que existe
        const {proyecto}=req.query;
        //revisar si existe
        const existeProyecto=await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'proyecto no encontrado'})
        }

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg: 'no autorizado'});
        }

        //obtener tareas por proyecto
        const tareas = await Tarea.find({ proyecto });
        res.json({tareas});

    } catch (error) {
        console.log(error);
        res.statys(500).send('Hubo un error');
    }
}

//actualizar una tarea
exports.actualizarTarea = async (req, res)=>{
    try {
        
        //extraer el proeycto y comprobar que existe
        const {proyecto,nombre, estado}=req.body;
        //revisar si existe
        //revisar si la tarea existe
        const tareaExiste=await Tarea.findById(req.params.id)

        if(!tareaExiste){
            return res.status(404).json({msg: 'tarea no encontrado'})
        }

        const existeProyecto=await Proyecto.findById(proyecto);

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg: 'no autorizado'});
        }

        //crear un objeto con la nueva info
        const nuevaTarea={};

        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;


        //guardar la tarea
        const tarea = await Tarea.findOneAndUpdate({_id: req.params.id},nuevaTarea,{new:true});

        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.statys(500).send('Hubo un error');
    }
}

//elimina una tarea
exports.eliminarTarea=async (req,res)=>{
    try {
        
        //extraer el proeycto y comprobar que existe
        const {proyecto}=req.query;
        //revisar si existe
        //revisar si la tarea existe
        const tareaExiste=await Tarea.findById(req.params.id)

        if(!tareaExiste){
            return res.status(404).json({msg: 'tarea no encontrado'})
        }
        //extraer proyecto
        const existeProyecto=await Proyecto.findById(proyecto);

        //revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString()!== req.usuario.id){
            return res.status(401).json({msg: 'no autorizado'});
        }

        //eliminar la tarea
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'tarea eliminada'});

    } catch (error) {
        console.log(error);
        res.statys(500).send('Hubo un error');
    }
}