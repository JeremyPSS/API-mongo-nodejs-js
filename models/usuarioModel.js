var mongoose = require('mongoose');
var schema = mongoose.Schema;
var clienteSchema = schema({
    id: String,
    nombre: String,
    apellido: String,
    correo: String,
    contrasenia: String,
});

module.exports = mongoose.model('usuario',clienteSchema);