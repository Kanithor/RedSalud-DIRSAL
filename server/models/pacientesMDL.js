const Joi = require('joi');
const mongoose = require('mongoose');

const Paciente = mongoose.model('Paciente',  new mongoose.Schema({
    nombre: {
        type: String,
        required:  true,
        minlength: 5,
        maxlength: 50
    },
    rut: {
        type: String,
        required:  true,
        minlength: 10,
        maxlength: 10,
        unique: true
    },
    email: {
        type: String,
        required:  true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    afiliado: {
        type: Boolean,
        required:  true,
        default: false
    }
    
}));

function validatePaciente(paciente) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        rut: Joi.string().min(10).max(10).required(),
        email: Joi.string().min(5).max(255).required().email(),
        afiliado: Joi.boolean().required()
    };

    return Joi.validate(paciente, schema);
}


exports.Genre = Paciente;
exports.validate = validatePaciente;