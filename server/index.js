const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usuarios = require('./routes/usuariosRT'); 
const auth = require('./routes/authRT');
const pacientes = require('./routes/pacientesRT');
//Inicialización
const app = express();
const db = require('./database');

//Configuraciones
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Rutas
app.use('/api/adminArea', require('./routes/adminAreaRT'));
app.use('/api/usuarios', usuarios );
app.use('/api/auth', auth);
app.use('/api/pacientes', pacientes);


//Ejecución de server
app.listen(app.get('port'), () => {
    console.log('Servidor ejecutando en puerto ', app.get('port'));
});
