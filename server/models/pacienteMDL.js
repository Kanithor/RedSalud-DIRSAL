const mongoose = require('mongoose');

//Esquema de Pacientes
const pacienteSchema = mongoose.Schema({
    nombre:                      { type: String, required: true, trim: true },
    email:                       { type: String, required: false, unique: true },
    rut:                         { type: Number, required: true, trim: true, unique: true},
    active:                      { type: Boolean, required: true, default: true},
    afiliado:                    { type: Boolean, required:  true, default: true},
    createdAt:                   { type: Date, default: Date.now }
});
exports.pacienteModel = mongoose.model('paciente', pacienteSchema);