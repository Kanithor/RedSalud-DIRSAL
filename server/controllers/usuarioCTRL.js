
const _ = require('lodash');
const usuarioMDL = require('../models/usuarioMDL');
const usuarioController = {};

usuarioController.getUsuarios = async(req,res) => {
    const usuarios = await usuarioMDL.usuarioModel.find()
    .catch(err => res.json(err));

    res.send(usuarios);
};

usuarioController.getUsuarioById = async(req,res) => {
    const usuario = await usuarioMDL.usuarioModel.findById(req.params.id)
                             .catch(err => res.json(err));
    res.send(usuario);
};


usuarioController.newUsuario = (req, res) => {
    let usuario = new usuarioMDL.usuarioModel();
    usuario.nombre = _.startCase(req.body.nombre);
    usuario.rut = req.body.rut;
    usuario.email = req.body.email;
    usuario.password = req.body.password;

    
    pregunta.save((err, preguntaGuardada) => {
        if (err) res.status(500).send({message: 'No se pudo guardar usuario'})
        else res.status(200).send({pregunta: preguntaGuardada})
    })
};

usuarioController.removeUsuario = async(req, res) => {
    const id = req.params.id;
    const removeUsuario = await usuarioMDL.usuarioModel.findByIdAndDelete(id)
                                            .catch(err => res.json(err));
    res.send(removeUsuario);
};

module.exports = usuarioController;