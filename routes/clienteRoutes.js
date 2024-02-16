var express = require('express');
var ClienteController = require('../controllers/clienteController');
//var verifyToken = require('../middleware/authMiddleware'); // Import the middleware


var api = express.Router();

//http://localhost:3800/api/cliente

api.get('/pruebas', ClienteController.pruebas);

// api.get('/cliente', ClienteController.listCliente); //get clients
// api.get('/cliente/:name', ClienteController.listClientByID); //get clients by id
// api.post('/cliente', ClienteController.saveCliente); //save client
// api.put('/cliente/:dni', ClienteController.updateCliente); //update client
// api.delete('/cliente/:dni', ClienteController.deleteCliente); //delete cliente

api.get('/cliente', ClienteController.verifyToken, ClienteController.listCliente); //get clients
api.get('/cliente/:name', ClienteController.verifyToken, ClienteController.listClientByID); //get clients by id
api.post('/cliente', ClienteController.verifyToken, ClienteController.saveCliente); //save client
api.put('/cliente/:dni', ClienteController.verifyToken, ClienteController.updateCliente); //update client
api.delete('/cliente/:dni', ClienteController.verifyToken, ClienteController.deleteCliente); //delete cliente



module.exports = api;
