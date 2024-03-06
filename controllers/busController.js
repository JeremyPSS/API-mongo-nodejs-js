const { model } = require('mongoose');
var Bus = require('../models/busModel');
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

async function saveBus(req, res) {
    var bus = new Bus(); 
    var params = req.body;
    if (params.placa) {
        bus.codigo = params.codigo;
        bus.placa = params.placa;
        bus.tipo = params.tipo;
        bus.estado = params.estado;
        bus.num_viajes = params.num_viajes;
        try {
            const busStored = await bus.save(); // save the cliente in db
            if (busStored) {
                const token = jwt.sign({ clientId: busStored._id }, 'pass123', { expiresIn: '1h' });
                res.status(200).json({ message:'Bus added successfully', busStored, token}); 
            } else {
                res.status(500).json({ message: 'no se insertó el bus' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Error en el servidor' });
        }
    } else {
        res.status(500).json({ message: 'La placa es obligatorio' });
    }
}


async function listBus(req, res) {
    try {
        const data = await Bus.find(); // 
        res.json(data);
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

async function listBusByID(req, res) {
    try {
        const {license} = req.params; //get the param from the url
        const result = await Bus.findOne({placa:license}); //search with a method from moongose
        if(result){
            res.json(result);
        }else{
            res.status(404).json({message:'Bus not found'});
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}


async function updateBus(req,res){
    try {
        const { code } = req.params; //get the dni from the url
        if(code){
            const updatedBus = await Bus.findOneAndUpdate({'codigo':code}, req.body, { new: true }); //search the client
            if (updatedBus) {
                res.status(200).json({message: 'Bus updated successfully', updatedBus }); //if exist
            } else {
                res.status(404).json({ message: 'Bus not found' });
            }
        }else{
            res.status(500).json({ message: 'codigo need to be defined' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

async function deleteBus(req, res) {
    try {
        const { code } = req.params;
        if (code) {
            const clientDeletedStatus = await Bus.findOneAndDelete({ 'codigo': code });
            if (clientDeletedStatus) {
                res.status(200).json({ message: 'Bus deleted successfully' });
            } else {
                res.status(404).json({ message: 'Bus not found' });
            }
        } else {
            res.status(500).json({ message: 'DNI need to be defined' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    saveBus,
    listBus,
    updateBus,
    deleteBus,
    listBusByID,
    verifyToken
};