var express = require('express');
var ClienteController = require('../controllers/clienteController');

var api = express.Router();

//http://localhost:3800/api/cliente

api.get('/pruebas', ClienteController.pruebas);

api.get('/cliente', ClienteController.listCliente); //get clients
api.get('/cliente/:name', ClienteController.listClientByID); //get clients by id
api.post('/cliente', ClienteController.saveCliente); //save client
api.put('/cliente/:dni', ClienteController.updateCliente); //update client
api.delete('/cliente/:dni', ClienteController.deleteCliente); //delete cliente

module.exports = api;
