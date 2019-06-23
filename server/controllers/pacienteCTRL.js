const _ = require('lodash');
const express = require('express');
const upload = require('express-fileupload');
const importExcel = require('convert-excel-to-json');

//express.use(upload());

const pacienteMDL = require('../models/pacienteMDL');
const pacienteController = {};


pacienteController.newPacientes = (req, res) => {
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

    let body = req.body;
    let file = req.file;

    /** Multer gives us file info in req.file object */
    if (!file) {
        var msg = 'Error al ingresar el archivo';
        res.render('confirmacion', { msg: msg });
    }
    /** Check the extension of the incoming file and 
     *  use the appropriate module
     */
    if (file.originalname.split('.')[file.originalname.split('.').length - 1] === 'xlsx') {
        exceltojson = xlsxtojson;
    } else {
        exceltojson = xlstojson;
    }

    try {
        exceltojson({
            input: file.path,
            output: "./uploads/data.json",
            lowerCaseHeaders: true
        }, function(err) {
            if (err) {
                return res.json({ error_code: 1, err_desc: err, data: null });
            } else {
                fs.readFile('./uploads/data.json', 'utf8', function(err, data) {
                    if (err) throw err;
                    obj = JSON.parse(data);

                    var datos = new Desvinculados({
                        colab: obj,
                        fecha: {
                            periodo: body.mes,
                            año: body.año
                        }
                    });

                    datos.save((err, active) => {

                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }
                        var msg = body.tipo + ' Grabados';
                        res.render('confirmacion', { msg: msg });
                    });
                });
            }
        });
    } catch (e) {
        res.json({ error_code: 1, err_desc: "Corupted excel file" });
    }
    try {
        fs.unlinkSync(file.path);
    } catch (e) {
        //error deleting the file
        console.log('No se pudo eliminar el archivo')
    };    
};

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