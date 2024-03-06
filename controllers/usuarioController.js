const { model } = require('mongoose');
var Usuario = require('../models/usuarioModel');

async function saveUsuario(req, res) {
    var usuario = new Usuario(); //create a new cliente from the db
    var params = req.body; //data from the json request
    if (params.nombre) {
        usuario.id = params.id;
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.correo = params.correo;
        usuario.contrasenia = params.contrasenia;
        try {
            const usuarioStored = await usuario.save(); // save the usuario in db
            if (usuarioStored) {
                res.status(200).json({ message:'User added successfully', usuarioStored}); 
            } else {
                res.status(500).json({ message: 'no se insertó el usuario' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).json({ message: 'El nombre es obligatorio' });
    }
}

async function listUsuario(req, res) {
    try {
        const data = await Usuario.find(); // 
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

async function listUsuarioByID(req, res) {
    try {
        const {name} = req.params; //get the param from the url
        const result = await Usuario.findOne({nombre:name}); //search with a method from moongose
        if(result){
            res.json(result);
        }else{
            res.status(404).json({message:'User not found'});
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}


async function updateUsuario(req,res){
    try {
        const { id } = req.params; //get the code from the url
        if(id){
            const updatedClient = await Usuario.findOneAndUpdate({'id':id}, req.body, { new: true }); //search the client
            if (updatedClient) {
                res.status(200).json({message: 'User updated successfully', updatedClient }); //if exist
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        }else{
            res.status(500).json({ message: 'id need to be defined' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteUsuario(req, res) {
    try {
        const { id } = req.params;
        if (id) {
            const clientDeletedStatus = await Usuario.findOneAndDelete({ 'id': id });
            if (clientDeletedStatus) {
                res.status(200).json({ message: 'Usuario deleted successfully' });
            } else {
                res.status(404).json({ message: 'Usuario not found' });
            }
        } else {
            res.status(500).json({ message: 'ID need to be defined' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    saveUsuario,
    listUsuario,
    updateUsuario,
    deleteUsuario,
    listUsuarioByID
};