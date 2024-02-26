const { model } = require('mongoose');
var Chofer = require('../models/choferModel');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ auth: false, message: 'Access denied! please verify your authentication' });
    }

    jwt.verify(token, 'pass123', function(err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
}


async function saveChofer(req, res) {
    var chofer = new Chofer(); //create a new cliente from the db
    var params = req.body; //data from the json request
    if (params.nombres) {
        chofer.codigo = params.codigo;
        chofer.nombres = params.nombres;
        chofer.cedula = params.cedula;
        chofer.apellidos = params.apellidos;
        chofer.fechaNacimiento = params.fechaNacimiento;
        chofer.aniosConduccion = params.aniosConduccion;
        try {
            const choferStored = await chofer.save(); // save the chofer in db
            if (choferStored) {
                //const token = jwt.sign({ clientId: choferStored._id }, 'pass123', { expiresIn: '1h' });
                //res.status(200).json({ message:'Client added successfully', choferStored, token}); 
                res.status(200).json({ message:'Client added successfully', choferStored}); 
            } else {
                res.status(500).json({ message: 'no se insertó el chofer' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).json({ message: 'El nombre es obligatorio' });
    }
}


async function listChofer(req, res) {
    try {
        const data = await Chofer.find(); // 
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

async function listChoferByID(req, res) {
    try {
        const {code} = req.params; //get the param from the url
        const result = await Chofer.findOne({codigo:code}); //search with a method from moongose
        if(result){
            res.json(result);
        }else{
            res.status(404).json({message:'Chofer not found'});
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}


async function updateChofer(req,res){
    try {
        const { code } = req.params; //get the code from the url
        if(code){
            const updatedClient = await Chofer.findOneAndUpdate({'codigo':code}, req.body, { new: true }); //search the client
            if (updatedClient) {
                res.status(200).json({message: 'Client updated successfully', updatedClient }); //if exist
            } else {
                res.status(404).json({ message: 'Client not found' });
            }
        }else{
            res.status(500).json({ message: 'Cedula need to be defined' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteChofer(req, res) {
    try {
        const { code } = req.params;
        if (code) {
            const clientDeletedStatus = await Chofer.findOneAndDelete({ 'codigo': code });
            if (clientDeletedStatus) {
                res.status(200).json({ message: 'Chofer deleted successfully' });
            } else {
                res.status(404).json({ message: 'Chofer not found' });
            }
        } else {
            res.status(500).json({ message: 'Codigo need to be defined' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    saveChofer,
    listChofer,
    updateChofer,
    deleteChofer,
    listChoferByID
};