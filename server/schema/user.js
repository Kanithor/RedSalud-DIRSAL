var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myuser = new Schema({
    area : String,
    fecha : String,
    comentarios : String,
    paciente : Number,
    createdAt : Date
});

module.exports = mongoose.model('queueRT', myuser);