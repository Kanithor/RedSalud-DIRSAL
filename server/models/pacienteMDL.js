const mongoose = require('mongoose');

//Esquema de Pacientes
const pacienteSchema = mongoose.Schema({
    nombre:                      { type: String, required: true, trim: true },
    email:                       { type: String, required: true, unique: true },
    rut:                         { type: String, required: true, trim: true, unique: true},
    estado:                      { type: Boolean, required: true, default: true},
    afiliado:                    { type: Boolean, required:  true, default: true},
    prevision:                   { type: String, required: false },
    createdAt:                   { type: Date, default: Date.now }
});
exports.pacienteModel = mongoose.model('paciente', pacienteSchema, 'pacientes');