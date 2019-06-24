const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre:                  { type: String, required: true},
    rut:                      { type: String, required: true},
    email:                    {type: String, required:  true },
    password:                  {type: String, required: true},
    tipo:                       { type: String, required: true},
    custom_attributes:           { type: String },
    createdAt:                   { type: Date, default: Date.now }
});

exports.usuarioModel = mongoose.model('usuario', usuarioSchema, 'usuarios');