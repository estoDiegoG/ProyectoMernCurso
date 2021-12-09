const Usuario=require('../models/Usuario');
const bcryptjs=require('bcryptjs');
const { validationResult}=require('express-validator')
const jwt = require('jsonwebtoken');

exports.autenticarUsuario=async(req, res)=>{
    //revisr si hay errores
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()});
    }

    //extraer email y password
    const {email, password}=req.body;
    try {
        
        //revisar que el email este registrado
        let usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({msg: 'el usuario no existe'})
        }

        //revisar password
        const passCorrecto=await bcryptjs.compare(password,usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'password incorrecto'});
        }

        //si todo es correcto
        //crear y firmar JWT
        const payload={
            usuario:{
                id:usuario.id
            }
        };

        //firmar token
        jwt.sign(payload, process.env.SECRETA,{
            expiresIn:3600
                }, (error, token)=>{
            if(error) throw error;
            //mensaje de confirmacion
            res.json({token});
        })

    } catch (error) {
        console.log(error);
    }
}


//obtiene usuario autenticado
exports.usuarioAutenticado=async (req,res)=>{
    try {
        const usuario=await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'hubo un error'});
    }
}