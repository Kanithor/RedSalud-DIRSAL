const mongoose = require('mongoose');

//Esquema de Cola
const queueSchema = mongoose.Schema({
    area:                   { type: String, required: true, trim: true }, 
    fecha:                  { type: String, required: true },
    comentarios:            { type: String, required: false, trim: true},
    paciente:               { type: Number, required: true},
    createdAt:              { type: Date, default: Date.now }
});
exports.queueModel = mongoose.model('queue', queueSchema, 'queues');