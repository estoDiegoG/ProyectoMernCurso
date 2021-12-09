const Usuario=require('../models/Usuario');
const bcryptjs=require('bcryptjs');
const { validationResult}=require('express-validator')
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res)=>{

    //revisr si hay errores
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()});
    }

    //extraer email y password
    const {email, password}=req.body;
    
    try {

        //revisar que usuario sea unico
        
        let usuario=await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'});
        }

        //crea nuevo usuario
        usuario=new Usuario(req.body); 

        //hash a password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password,salt);

        //guardar usuario
        await usuario.save();

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
        res.status(400).send("hubo un error");
    }
}