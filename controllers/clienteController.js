
const { model } = require('mongoose');
var Cliente = require('../models/clienteModel');

function pruebas(req, res) {
    res.status(200).send({
        mensaje: 'ruta de prueba de mi api con node'
    });
}

//endpoint to save a new client
async function saveCliente(req, res) {
    var cliente = new Cliente(); //create a new cliente from the db
    var params = req.body; //data from the json request
    if (params.nombre) {
        cliente.nombre = params.nombre;
        cliente.dni = params.dni;
        cliente.email = params.email;
        try {
            const clienteStored = await cliente.save(); // save the cliente in db
            if (clienteStored) {
                res.status(200).json({ message:'Client added successfully', clienteStored}); 
            } else {
                res.status(500).json({ message: 'no se insertó el cliente' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).json({ message: 'El nombre es obligatorio' });
    }
}

async function listCliente(req, res) {
    try {
        const data = await Cliente.find(); // 
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

async function updateCliente(req,res){
    try {
        const { dni } = req.params;
        if(dni){
            const updatedClient = await Cliente.findOneAndUpdate({'dni':dni}, req.body, { new: true });
            if (updatedClient) {
                res.status(200).json({message: 'Client updated successfully', updatedClient });
            } else {
                res.status(404).json({ message: 'Client not found' });
            }
        }else{
            res.status(500).json({ message: 'DNI need to be defined' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteCliente(req, res) {
    try {
        const { dni } = req.params;
        if (dni) {
            const clientDeletedStatus = await Cliente.findOneAndDelete({ 'dni': dni });
            if (clientDeletedStatus) {
                res.status(200).json({ message: 'Client deleted successfully' });
            } else {
                res.status(404).json({ message: 'Client not found' });
            }
        } else {
            res.status(500).json({ message: 'DNI need to be defined' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    pruebas,
    saveCliente,
    listCliente,
    updateCliente,
    deleteCliente
};