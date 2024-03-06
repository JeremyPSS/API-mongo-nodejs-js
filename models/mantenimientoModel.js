var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bus = require('./busModel');

var mantenimientoSchema = schema({
    codigo: Number,
    fecha: String,
    kilometraje: Number,
    costo: Number,
    tipo: String,
    vehiculo: String
});

module.exports = mongoose.model('mantenimiento', mantenimientoSchema);