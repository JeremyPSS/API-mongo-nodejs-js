var express = require('express');
var app = express();

//cargar las rutas
var cliente_routes = require('./routes/clienteRoutes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//rutas
app.get('/prueba', (req, res) =>{
    res.status(200).send({
        mensaje: 'ruta de prueba de mi api con node'
    });
});

//ruta base
app.use('/api', cliente_routes);

module.exports = app;