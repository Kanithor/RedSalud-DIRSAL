const mongoose = require('mongoose');

const URI = 'mongodb://localhost/redsalud';


mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('Base de datos conectada correctamente'))
    .catch(err => console.error(err));

module.exports = mongoose;