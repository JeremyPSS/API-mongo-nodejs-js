var express = require('express');
//var ClienteController = require('../controllers/clienteController');
var BusController = require('../controllers/busController');
var ChoferController = require('../controllers/choferController');
<<<<<<< HEAD
var MantenimientoController = require('../controllers/mantenimientoController');
var ViajeController = require('../controllers/viajeController');
var UsuarioController = require('../controllers/usuarioController');
=======
>>>>>>> 3e0508a59cc4d37146e92676def6615ae6111c9d
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

<<<<<<< HEAD
api.get('/bus', BusController.listBus);
api.get('/bus/:license', BusController.listBusByID);
api.post('/bus', BusController.saveBus);
api.put('/bus/:code', BusController.updateBus);
api.delete('/bus/:code', BusController.deleteBus);

api.get('/chofer', ChoferController.listChofer);
api.get('/chofer/:code', ChoferController.listChoferByID);
api.post('/chofer', ChoferController.saveChofer);
api.put('/chofer/:code', ChoferController.updateChofer);
api.delete('/chofer/:code', ChoferController.deleteChofer);
=======
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


>>>>>>> 3e0508a59cc4d37146e92676def6615ae6111c9d


api.get('/mante', MantenimientoController.listMantenimiento);
api.get('/mante/:code', MantenimientoController.listMantenimientoByID);
api.post('/mante', MantenimientoController.saveMante);
api.put('/mante/:code', MantenimientoController.updateMantenimiento);
api.delete('/mante/:code', MantenimientoController.deleteMantenimiento);

api.get('/viaje', ViajeController.listViaje);
api.get('/viaje/:code', ViajeController.listViajeByID);
api.post('/viaje', ViajeController.saveViaje);
api.put('/viaje/:code', ViajeController.updateViaje);
api.delete('/viaje/:code', ViajeController.deleteViaje);

api.get('/usuario', UsuarioController.listUsuario);
api.get('/usuario/:name', UsuarioController.listUsuarioByID);
api.post('/usuario', UsuarioController.saveUsuario);
api.put('/usuario/:id', UsuarioController.updateUsuario);
api.delete('/usuario/:id', UsuarioController.deleteUsuario);

//Login
api.get('/users', (req, res) => {
    res.send('users');
})


module.exports = api;