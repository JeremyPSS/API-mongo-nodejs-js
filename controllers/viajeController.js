const { model } = require('mongoose');
var Viaje = require('../models/viajeModel');
const jwt = require('jsonwebtoken');

async function saveViaje(req, res) {
    var viaje = new Viaje(); //create a new cliente from the db
    var params = req.body; //data from the json request
    if (params.origen) {
        viaje.codigo = params.codigo;
        viaje.origen = params.origen;
        viaje.destino = params.destino;
        viaje.hora = params.hora;
        viaje.fecha = params.fecha;
        viaje.vehiculo = params.vehiculo;
        viaje.tripulacion = params.tripulacion;
        viaje.costo = params.costo;
        viaje.estado = params.estado;
        try {
            const viajeStored = await viaje.save(); // save the chofer in db
            if (viajeStored) {
                res.status(200).json({ message: 'Viaje added successfully', viajeStored });
            } else {
                res.status(500).json({ message: 'No se insertó el viaje' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).json({ message: 'El origen es obligatorio' });
    }
}


async function listViaje(req, res) {
    try {
        const data = await Viaje.find(); // 
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

async function listViajeByID(req, res) {
    try {
        const { code } = req.params; //get the param from the url
        const result = await Viaje.findOne({ codigo: code }); //search with a method from moongose
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Viaje not found' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}


async function updateViaje(req, res) {
    try {
        const { code } = req.params; //get the code from the url
        if (code) {
            const updateVia = await Viaje.findOneAndUpdate({ 'codigo': code }, req.body, { new: true }); //search the client
            if (updateVia) {
                res.status(200).json({ message: 'Viaje updated successfully', updateVia }); //if exist
            } else {
                res.status(404).json({ message: 'Viaje not found' });
            }
        } else {
            res.status(500).json({ message: 'Origen need to be defined' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteViaje(req, res) {
    try {
        const { code } = req.params;
        if (code) {
            const viajeDeletedStatus = await Viaje.findOneAndDelete({ 'codigo': code });
            if (viajeDeletedStatus) {
                res.status(200).json({ message: 'Viaje deleted successfully' });
            } else {
                res.status(404).json({ message: 'Viaje not found' });
            }
        } else {
            res.status(500).json({ message: 'Codigo need to be defined' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    saveViaje,
    listViaje,
    updateViaje,
    deleteViaje,
    listViajeByID
};