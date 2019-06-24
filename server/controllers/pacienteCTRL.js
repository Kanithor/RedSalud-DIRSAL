const _ = require('lodash');
const express = require('express');
const upload = require('express-fileupload');
const importExcel = require('convert-excel-to-json');
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const mongoose = require('mongoose');
const fs = require('fs');
const multer = require('multer');
const archivo = multer({
    dest: './uploads/',
    fileFilter: function(req, file, callback) {
    if (['xls', 'xlsx', 'csv'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
        return callback('Este documento no es soportado.');
    }
    callback(null, true);
    }
});

//express.use(upload());

const pacienteMDL = require('../models/pacienteMDL');
const pacienteController = {};


// pacienteController.newPacientes = archivo.single('file'), (req, res) => {
    
// };

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
    pacienteMDL.pacienteModel.find(function(err, pacientes){
        if (err){res.send("Error")}
        res.render('listapacientes', {pacientes: pacientes})
    });
    //res.render('listapacientes');
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