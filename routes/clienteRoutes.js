var express = require('express');
var ClienteController = require('../controllers/clienteController');

var api = express.Router();

//http://localhost:3800/api/cliente

api.get('/pruebas', ClienteController.pruebas);
api.post('/cliente', ClienteController.saveCliente);
api.get('/clientes', ClienteController.listCliente);
api.post('/cliente/:dni', ClienteController.updateCliente);
api.post('/clienteRemove/:dni', ClienteController.deleteCliente);

module.exports = api;
