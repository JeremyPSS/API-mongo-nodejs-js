
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var busSchema = schema({
    codigo: Number,
    placa: String,
    tipo: String,
    estado: String,
    num_viajes: Number
});

module.exports = mongoose.model('bus',busSchema);