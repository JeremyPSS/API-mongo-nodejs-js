const { model } = require('mongoose');
var Mantenimiento = require('../models/mantenimientoModel');
const jwt = require('jsonwebtoken');

async function saveMante(req, res) {
    var mantenimiento = new Mantenimiento(); //create a new cliente from the db
    var params = req.body; //data from the json request
    if (params.tipo) {
        mantenimiento.codigo = params.codigo;
        mantenimiento.fecha = params.fecha;
        mantenimiento.kilometraje = params.kilometraje;
        mantenimiento.costo = params.costo;
        mantenimiento.tipo = params.tipo;
        mantenimiento.vehiculo = params.vehiculo;
        try {
            const mantenimientoStored = await mantenimiento.save(); // save the chofer in db
            if (mantenimientoStored) {
                res.status(200).json({ message: 'Mantenimiento added successfully', mantenimientoStored });
            } else {
                res.status(500).json({ message: 'No se insertó el mantenimiento' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).json({ message: 'La fecha es obligatorio' });
    }
}


async function listMantenimiento(req, res) {
    try {
        const data = await Mantenimiento.find(); // 
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

async function listMantenimientoByID(req, res) {
    try {
        const { code } = req.params; //get the param from the url
        const result = await Mantenimiento.findOne({ codigo: code }); //search with a method from moongose
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Mantenimiento not found' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}


async function updateMantenimiento(req, res) {
    try {
        const { code } = req.params; //get the code from the url
        if (code) {
            const updateMante = await Mantenimiento.findOneAndUpdate({ 'codigo': code }, req.body, { new: true }); //search the client
            if (updateMante) {
                res.status(200).json({ message: 'Mantinimiento updated successfully', updateMante }); //if exist
            } else {
                res.status(404).json({ message: 'Mantenimiento not found' });
            }
        } else {
            res.status(500).json({ message: 'Fecha need to be defined' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteMantenimiento(req, res) {
    try {
        const { code } = req.params;
        if (code) {
            const mantenimientoDeletedStatus = await Mantenimiento.findOneAndDelete({ 'codigo': code });
            if (mantenimientoDeletedStatus) {
                res.status(200).json({ message: 'Mantenimiento deleted successfully' });
            } else {
                res.status(404).json({ message: 'Mantenimiento not found' });
            }
        } else {
            res.status(500).json({ message: 'Codigo need to be defined' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    saveMante,
    listMantenimiento,
    updateMantenimiento,
    deleteMantenimiento,
    listMantenimientoByID
};