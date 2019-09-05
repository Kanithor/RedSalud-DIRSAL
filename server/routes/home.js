const express = require('express');
var async = require('async');
const mongoose = require('mongoose');
const router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var usuarioMDL = require('../models/usuarioMDL');
var queueMDL = require('../models/queueMDL');
const knowledgebaseMDL = require('../models/knowledgebaseMDL');

var url = 'mongodb://localhost/redsalud';


//call add del html From method
router.get('/encolar', async(req, res, next) => {
	knowledgebaseMDL.areaModel.find({ nombre: { $ne: "Administración" } }, function(err, areas){
        if (err){res.send("Error")}
        res.render('encolar', {areas: areas})
    });
	//res.render('encolar');
});
//add form processings usando post method en html
router.post('/encolar', function(req, res, next){
	console.log(req.body)

	//Arreglo de datos
	const mybodydata= {
		area : req.body.area,
		fecha : req.body.fecha,
		comentarios : req.body.comentario,
		paciente : req.body.paciente,
		hora : req.body.hora

	}
	//funcion manejada en la carpeta schema
	var data = new queueMDL.queueModel(mybodydata);

	data.save(function(err){
		if (err){
			res.render('encolar',{message : 'user registered not succefully'});
		}
		else{
			res.render('successfull', {message: 'User register succefully'});
		}
	})

});


function error404(req, res, next)
{
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
};
router.get('/', function(req,res){
    res.render('index');
});
router.get('/knowledgebase', function(req,res){
    res.render('knowledgebase');
});

router.get('/desencolar', async(req,res) => {
    queueMDL.queueModel.find(function(err, solicitudes){
        if (err){res.send("Error")}
        res.render('desencolar', {solicitudes: solicitudes})
    });
});
// router.get('/newpacientes', function(req,res){
//     res.render('newpacientes');
// });
router.get('/register', function(req,res){
    res.render('register');
});
router.post('/register', function(req,res,next){
	console.log(req.body)

	const mybo={
		nombre: req.body.nombre,
		rut: req.body.rut,
		email: req.body.email,
		password: req.body.password,
		tipo: req.body.tipo,
		custom_attributes: req.body.custom_attributes,
		createdAt: req.body.createdAt,
	}

	var data = new usuarioMDL.usuarioModel(mybo);

	data.save(function(err){
		if (err){
			res.render('register',{message : 'user registered not succefully'});
		}
		else{
			res.render('register', {message: 'User register succefully'});
		}
	})
});

router.get('/ingresoPaciente', function(req,res){
    res.render('ingresopacientes');
});
router.get('/us', function(req,res){
    res.render('us');
});

router.get('/preguntaper', function(req,res){
    res.render('preguntaper');
});

router.get('/editarklb', async(req,res) => {
    knowledgebaseMDL.preguntaModel.find(function(err, preguntas){
        if (err){res.send("Error")}
        res.render('editarklb', {preguntas: preguntas})
    });
});
router.get('/verUsuarios', async(req,res)=>{
	usuarioMDL.usuarioModel.find(function(err,solicitudes){
		if(err){res.send("Error")}
		res.render('verUsuarios',{solicitudes:solicitudes})
	});
});

router.get('/responderpreguntas', async(req,res) => {
    knowledgebaseMDL.preguntaModel.find(function(err, preguntas){
        if (err){res.send("Error")}
        res.render('responderpreguntas', {preguntas: preguntas})
    });
});
router.get('/area', function(req,res){
	res.render('area');
});

router.get('/verAreas', async(req,res)=>{
	knowledgebaseMDL.areaModel.find(function(err,solicitudes){
		if(err){res.send("Error")}
		res.render('verAreas',{solicitudes:solicitudes})
	});
});

router.use(error404)
    
module.exports = router;