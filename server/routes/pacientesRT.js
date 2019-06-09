
const {Paciente,validate} = require('../models/pacienteMDL'); 
const mongoose = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
 
router.post('/', async (req,res) => { 
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message); 
 
    let paciente = await Paciente.findOne({email: req.body.email}); 
    if (paciente) return res.status(400).send('Usuario ya esta en la BD.'); 
 
    paciente = new Paciente({ 
        nombre: req.body.nombre, 
        rut: req.body.rut, 
        email: req.body.email, 
        afiliado: req.body.afiliado
    }); 
   
 
    await user.save(); 
 
    res.send({
        nombre: user.nombre,
        rut: user.rut,
        email: user.email
    }); 
}); 
 
module.exports = router; 