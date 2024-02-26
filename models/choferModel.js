var mongoose = require('mongoose');
var schema = mongoose.Schema;

var choferSchema = schema({
    codigo: Number,
    cedula: String,
    nombres: String,
    apellidos: String,
    fechaNacimiento: String,
    aniosConduccion: Number
});

module.exports = mongoose.model('chofer',choferSchema);