const _ = require('lodash');

const pacienteMDL = require('../models/pacienteMDL');
const pacienteController = {};

pacienteController.getPaciente = async(req, res) => {
    name = req.body.nombre;
    const paciente = await pacienteMDL.pacienteModel.findOne({ nombre : _.startCase(name) })
                            .catch(err => res.json(err));
    res.send(paciente);
};

pacienteController.getPacienteById = async(req, res) => {
    const paciente = await pacienteMDL.pacienteModel.findById(req.params.id)
                            .catch(err => res.json(err));
    res.send(paciente);
};

pacienteController.getPacientes = async(req, res) => {
    const pacientes = await pacienteMDL.pacienteModel.find()
                            .catch(err => res.json(err));
    res.send(pacientes);
};

pacienteController.newPaciente = (req, res) => {
    let paciente = new pacienteMDL.pacienteModel();
    paciente.nombre = _.startCase(req.body.nombre);
    paciente.rut = req.body.rut;
    
    paciente.save((err, pacienteGuardado) => {
        if (err) res.status(500).send({message: 'No se pudo guardar paciente'})
        else res.status(200).send({paciente: pacienteGuardado})
    })
};

pacienteController.newPacientes = (req, res) => {
    console.log('Ruta funcionando');
    
};

pacienteController.editPaciente = async(req, res) => {
    const id = req.params.id;
    const paciente = { "nombre": req.body.nombre };
    const editpaciente = await pacienteMDL.pacienteModel.findByIdAndUpdate(id, {$set: paciente}, {new: true})
                                            .catch(err => res.json(err));
    res.send(editpaciente);
};

pacienteController.removePaciente = async(req, res) => {
    const id = req.params.id;
    const removepaciente = await pacienteMDL.pacienteModel.findByIdAndUpdate(id, {$set: {active: false}})
                                            .catch(err => res.json(err));
    res.send(removepaciente);
};

module.exports = pacienteController;