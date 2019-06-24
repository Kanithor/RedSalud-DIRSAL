const express = require('express');
var async = require('async');
const mongoose = require('mongoose');
const router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var UsersModel 	= require('../schema/user' );

var url = 'mongodb://localhost/redsalud';


//call add del html From method
router.get('/encolar', function(req, res, next){
	res.render('encolar');
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
		createdAt : req.body.createdAt

	}
	//funcion manejada en la carpeta schema
	var data = UsersModel(mybodydata);

	data.save(function(err){
		if (err){
			res.render('encolar',{message : 'user registered not succefully'});
		}
		else{
			res.render('encolar', {message: 'User register succefully'});
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
    UsersModel.find(function(err, solicitudes){
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
router.get('/ingresoPaciente', function(req,res){
    res.render('ingresopacientes');
});
router.get('/us', function(req,res){
    res.render('us');
});

router.get('/preguntaper', function(req,res){
    res.render('preguntaper');
});



router.use(error404)
    
module.exports = router;