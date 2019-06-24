const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/redsalud', { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Base de datos conectada correctamente'))
    .catch(err => console.error(err));

module.exports = mongoose;