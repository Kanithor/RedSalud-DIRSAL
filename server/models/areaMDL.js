const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    nombre : {type: String, require:true}
});

exports.areaModel = mongoose.model('areas',areaSchema,'areas');