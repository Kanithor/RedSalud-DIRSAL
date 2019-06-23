const express = require('express');
var async = require('async');
const router = express.Router();


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
}
router.get('/', function(req,res){
    res.render('index');
});
router.get('/knowledgebase', function(req,res){
    res.render('knowledgebase');
});
router.get('/encolar', function(req,res){
    res.render('encolar');
});
router.get('/desencolar', function(req,res){
    res.render('desencolar');
});
// router.get('/newpacientes', function(req,res){
//     res.render('newpacientes');
// });
router.use(error404)
    
module.exports = router