var express = require('express');
//var ClienteController = require('../controllers/clienteController');
var BusController = require('../controllers/busController');
var ChoferController = require('../controllers/choferController');
var cors = require('cors'); // Import the cors middleware

var api = express.Router();

// Use cors middleware before defining your routes
api.use(cors());

//http://localhost:3800/api/cliente

// api.get('/cliente', ClienteController.verifyToken, ClienteController.listCliente); //get clients
// api.get('/cliente/:name', ClienteController.verifyToken, ClienteController.listClientByID); //get clients by id
// api.post('/cliente', ClienteController.verifyToken, ClienteController.saveCliente); //save client
// api.put('/cliente/:dni', ClienteController.verifyToken, ClienteController.updateCliente); //update client
// api.delete('/cliente/:dni', ClienteController.verifyToken, ClienteController.deleteCliente); //delete cliente

api.get('/bus', BusController.listBus); 
api.get('/bus/:license',  BusController.listBusByID); 
api.post('/bus',  BusController.saveBus); 
api.put('/bus/:code',  BusController.updateBus); 
api.delete('/bus/:code',  BusController.deleteBus); 

api.get('/chofer', ChoferController.listChofer); 
api.get('/chofer/:code',  ChoferController.listChoferByID); 
api.post('/chofer',  ChoferController.saveChofer); 
api.put('/chofer/:code',  ChoferController.updateChofer); 
api.delete('/chofer/:code',  ChoferController.deleteChofer); 




module.exports = api;
