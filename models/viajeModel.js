var mongoose = require('mongoose');
var schema = mongoose.Schema;

var viajeSchema = schema({
    codigo: Number,
    origen: String,
    destino: String,
    hora: String,
    fecha: String,
    vehiculo: String,
    tripulacion: String,
    costo: Number,
    estado: String
})

module.exports = mongoose.model('viaje', viajeSchema);