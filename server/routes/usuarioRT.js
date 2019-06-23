const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioCTRL');
 
module.exports = router; 
router.get('/', usuarioController.getUsuarios);
router.get('/getUsuario/:id', usuarioController.getUsuarioById);
router.post('/newUsuario', usuarioController.newUsuario);
router.put('/editUsuario/:id', usuarioController.editUsuario);
router.delete('/deleteUsuario/:id', usuarioController.removeUsuario);