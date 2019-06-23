const _ = require('lodash');

const queueMDL = require('../models/queueMDL');
const queueController = {};

queueController.getSolicitudes = async(req,res) => {
    const queues = await queueMDL.queueModel.find()
                            .catch(err => res.json(err));
    res.send(queues);
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