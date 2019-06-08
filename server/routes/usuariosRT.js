const {User,validate} = require('../models/usuarioMDL'); 
const mongoose = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
 
router.post('/', async (req,res) => { 
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message); 
 
    let user = await User.findOne({email: req.body.email}); 
    if (user) return res.status(400).send('Usuario ya esta registrado.'); 
 
    user = new User({ 
        nombre: req.body.nombre, 
        rut: req.body.rut, 
        email: req.body.email, 
        password: req.body.password 
    }); 
 
    await user.save(); 
 
    res.send(user); 
}); 
 
module.exports = router; 
 
// const usuarios = require('./routes/usuarios); en index y app.use('/api/usuarios', usuarios)