const _ = require('lodash');
const async = require('async');
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
const router = express.Router();

const pacienteCTRL = require('../controllers/pacienteCTRL');
const pacienteMDL = require('../models/pacienteMDL');

//estandarizador de rut
function formateaRut(rut) {
 
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
}

//Archivo de rutas en las cuales debe incurrir el sistema para gestionar pacientes

router.get('/', pacienteCTRL.getPacientes);
router.get('/getPaciente/', pacienteCTRL.getPaciente);
router.get('/getPaciente/:id', pacienteCTRL.getPacienteById);
router.post('/newPaciente', pacienteCTRL.newPaciente);
router.get('/newpacientes', function(req,res){
    res.render('ingresopacientes');
});
router.post('/newPacientes', archivo.single('file'), function(req, res) {
    console.log('HOLA ENTRO');
    
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
                    var contador = 0;
                    console.log(obj.length);
                    
                    async.whilst (
                        function () { return contador != obj.length; 
                        },
                        function (cb) {
                            
                            if (obj[contador].estado == 'inactivo'){ obj[contador].estado = false }
                            else if (obj[contador].estado == 'activo'){ obj[contador].estado = true};
                            
                            
                            var rut = formateaRut(obj[contador].rut);
                            var newPaciente = new pacienteMDL.pacienteModel();
                            newPaciente.rut = rut;
                            newPaciente.nombre = obj[contador].nombre;
                            newPaciente.estado = obj[contador].estado;
                            newPaciente.prevision = obj[contador].prevision;
                            newPaciente.email = obj[contador].email;
                            newPaciente.afiliado = obj[contador].afiliado;
                            
                            console.log(contador);
                            
                            console.log(newPaciente);
                            
                            
                                pacienteMDL.pacienteModel.findOneAndUpdate(
                                    { "rut": newPaciente.rut
                                    },
        
                                     {$set : newPaciente}
                                    ,
        
                                    { upsert: true
                                    },
        
                                    function (err) {
                                        if(err){
                                            console.log(err);
                                            res.json({err:true, 	message:'No Se Ha Ingresado Paciente'});
                                        }
                                    }
                                )
                                
                              contador++;
                              cb();
                            
                        },
                        function (err) {
                            
                                
                            if (err){ res.send(err)}
                        }
                    ); 
                    

                    console.log(obj);
                                console.log('Operación default realizada.');
                                res.json(obj);
                    
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
    
});
router.put('/editPaciente/:id', pacienteCTRL.editPaciente);
// Método PUT debido a que paciente seguirá en sistema, pero tendrá el flag de inactivo
router.put('/deletePaciente/:id', pacienteCTRL.removePaciente);

module.exports = router;