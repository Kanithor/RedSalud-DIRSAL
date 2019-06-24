const _ = require('lodash');
const mongoose = require('mongoose');
const async = require('async');

const queueMDL = require('../models/queueMDL');
const queueController = {};

// var getSolicitudesFNC = function () {
//     var promise = new Promise(function (resolve, reject) {
//       var jsonStr;
      
//       const queues = queueMDL.queueModel.find(), function(err, result){
//         if(err) {
//           reject(err);
//         } else {
//           jsonStr = JSON.stringify(result)
//           resolve(jsonStr);
//         };
  
//       });
  
//     });
  
//     return promise;
//   };

queueController.getSolicitudes = async(req,res) => {
    mongoose.model("queuerts").find(function(err, solicitudes){
        if (err){res.send("Error")}
        res.send(solicitudes);
        //res.render('desencolar', {solicitudes: solicitudes})
    });
};

queueController.getSolicitudById = async(req,res) => {
    const queue = await queueMDL.queueModel.findById(req.params.id)
                            .catch(err => res.json(err));
    res.send(queue);
};

queueController.newSolicitud = (req,res) => {
    let queue = new queueMDL.queueModel();
    queue.area = _.startCase(req.body.area);
    queue.fecha = _.startCase(req.body.fecha);
    queue.comentarios = _.startCase(req.body.comentarios);
    queue.paciente = _.startCase(req.body.paciente);

    queue.save((err, queueGuardada) => {
        if (err) res.status(500).send({message: 'No se pudo encolar solicitud'})
        else res.status(200).send({queue: queueGuardada})
    })
};

queueController.removeSolicitud = async(req, res) => {
    const id = req.params.id;
    const removeSolicitud = await queueMDL.queueModel.findByIdAndDelete(id)
                                            .catch(err => res.json(err));
    res.send(removeSolicitud);
};

module.exports = queueController;