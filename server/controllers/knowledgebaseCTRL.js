
const _ = require('lodash');

const klbMDL = require('../models/knowledgebaseMDL');
const klbController = {};

klbController.getPregunta = async(req,res) => {
    title = req.body.titulo;
    const pregunta = await klbMDL.preguntaModel.findOne({titulo: _.startCase(title)})
                             .catch(err => res.json(err));
    res.send(pregunta);
};

klbController.getPreguntas = async(req, res) => {
    const preguntas = await klbMDL.preguntaModel.find()
                            .catch(err => res.json(err));
    res.send(preguntas);
};


klbController.getPreguntaById = async(req,res) => {
    const pregunta = await klbMDL.preguntaModel.findById(req.params.id)
                             .catch(err => res.json(err));
    res.send(pregunta);
};

klbController.getArea = async(req,res) => {
    name = req.body.nombre;
    const area = await klbMDL.areaModel.findOne({nombre: _.startCase(name)})
                             .catch(err => res.json(err));
    res.send(area);
};

klbController.getAreaById = async(req,res) => {
    const area = await klbMDL.areaModel.findById(req.params.id)
                             .catch(err => res.json(err));
    res.send(area);
};

klbController.getAreas = async(req, res) => {
    const areas = await klbMDL.areaModel.find()
                            .catch(err => res.json(err));
    res.send(areas);
};

klbController.getRespuestaById = async(req,res) => {
    const respuesta = await klbMDL.respuestaModel.findById(req.params.id)
                             .catch(err => res.json(err));
    res.send(respuesta);
};

klbController.getRespuestas = async(req, res) => {
    const respuestas = await klbMDL.respuestaModel.find()
                            .catch(err => res.json(err));
    res.send(respuestas);
};

klbController.newPregunta = (req, res) => {
    let pregunta = new klbMDL.preguntaModel();
    pregunta.titulo = _.startCase(req.body.titulo);
    pregunta.area = _.startCase(req.body.area);
    pregunta.cuerpo = _.startCase(req.body.cuerpo);

    
    pregunta.save((err, preguntaGuardada) => {
        if (err) res.status(500).send({message: 'No se pudo guardar pregunta'})
        else res.status(200).send({pregunta: preguntaGuardada})
    })
};

klbController.newArea = (req, res) => {
    let area = new klbMDL.areaModel();
    area.nombre = _.startCase(req.body.nombre);
    
    area.save((err, areaGuardada) => {
        if (err) res.status(500).send({message: 'No se pudo guardar area'})
        else res.status(200).send({area: areaGuardada})
    })
};

klbController.newRespuesta = (req, res) => {
    let respuesta = new klbMDL.respuestaModel();
    respuesta.cuerpo = _.startCase(req.body.cuerpo);
    respuesta.area = _.startCase(req.body.area);

    
    respuesta.save((err, respuestaGuardada) => {
        if (err) res.status(500).send({message: 'No se pudo guardar respuesta'})
        else res.status(200).send({respuesta: respuestaGuardada})
    })
};

klbController.editPregunta = async(req, res) => {
    const id = req.params.id;
    const pregunta = { "titulo": req.body.titulo,"area": req.body.area,"cuerpo": req.body.cuerpo };
    const editpregunta = await klbMDL.preguntaModel.findByIdAndUpdate(id, {$set: pregunta}, {new: true})
                                            .catch(err => res.json(err));
    res.send(editPregunta);
};

klbController.editArea = async(req, res) => {
    const id = req.params.id;
    const area = { "nombre": req.body.nombre};
    const editarea = await klbMDL.areaModel.findByIdAndUpdate(id, {$set: area}, {new: true})
                                            .catch(err => res.json(err));
    res.send(editArea);
};

klbController.editRespuesta = async(req, res) => {
    const id = req.params.id;
    const respuesta = { "area": req.body.area,"cuerpo": req.body.cuerpo};
    const editrespuesta = await klbMDL.respuestaModel.findByIdAndUpdate(id, {$set: respuesta}, {new: true})
                                            .catch(err => res.json(err));
    res.send(editRespuesta);
};

klbController.removePregunta = async(req, res) => {
    const id = req.params.id;
    const removePregunta = await klbMDL.preguntaModel.findByIdAndDelete(id)
                                            .catch(err => res.json(err));
    res.send(removePregunta);
};

klbController.removeArea = async(req, res) => {
    const id = req.params.id;
    const removeArea = await klbMDL.areaModel.findByIdAndDelete(id)
                                            .catch(err => res.json(err));
    res.send(removeArea);
};

klbController.removeRespuesta = async(req, res) => {
    const id = req.params.id;
    const removeRespuesta = await klbMDL.respuestaModel.findByIdAndDelete(id)
                                            .catch(err => res.json(err));
    res.send(removeRespuesta);
};

module.exports = klbController;