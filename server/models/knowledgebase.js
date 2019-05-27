const mongoose = require('mongoose');
const {Schema} = mongoose;

//Esquema de Áreas
const areaSchema = mongoose.Schema({
    nombre:                  { type: String, required: true, trim: true },
    custom_attributes:           { type: Object },
    createdAt:                   { type: Date, default: Date.now }
});
exports.employeeBukModel = mongoose.model('area', areaSchema, 'areas');

//Esquema de Pregunta
const preguntaSchema = mongoose.Schema({
    area:                  { type: String, required: true, trim: true },
    cuerpo:                  { type: String, required: true, trim: true },
    custom_attributes:           { type: Object },
    createdAt:                   { type: Date, default: Date.now }
});
exports.employeeBukModel = mongoose.model('pregunta', preguntaSchema, 'preguntas');

//Esquema de Respuesta
const respuestaSchema = mongoose.Schema({
    area:                  { type: String, required: true, trim: true },
    titulo:                  { type: String, required: true, trim: true },
    cuerpo:                  { type: String, required: true, trim: true },
    custom_attributes:           { type: Object },
    createdAt:                   { type: Date, default: Date.now }
});
exports.employeeBukModel = mongoose.model('respuesta', respuestaSchema, 'respuestas');

