var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://jeremy:sqldbjeremy@cluster0.knej7xq.mongodb.net/project_milton',{useUnifiedTopology: true, useNewUrlParser: true}).
    then(()=>{
        console.log('Conexion exitosa');
        app.listen(port, () => {
            console.log('Servidor corriendo en el puerto 3800');
        });
    })
    .catch(err => console.log(err));

