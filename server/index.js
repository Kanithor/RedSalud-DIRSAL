const express = require('express');
const morgan = require('morgan');

const app = express();

//Configuraciones
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());


//Rutas
const indexRoutes = require('./routes/index');


//Inicialización de server
app.listen(app.get('port'), () => {
    console.log('Servidor ejecutando en puerto ', app.get('port'));
});