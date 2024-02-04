
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var clienteSchema = schema({
    dni: String,
    nombre: String,
    email: String
});

module.exports = mongoose.model('cliente',clienteSchema);