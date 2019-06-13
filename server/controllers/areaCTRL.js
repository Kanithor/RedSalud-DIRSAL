const KBMDLS = require('../models/knowledgebaseMDL');
const areaController = {};

areaController.getArea = async(req, res) => {
    name = req.body.nombre;
    const area = await KBMDLS.areaModel.findOne({ nombre : name })
                            .catch(err => res.json(err));
    res.send(area);
};

areaController.getAreaById = async(req, res) => {
    const area = await KBMDLS.areaModel.findById(req.params.id)
                            .catch(err => res.json(err));
    res.send(area);
};

areaController.getAreas = async(req, res) => {
    const areas = await KBMDLS.areaModel.find()
                            .catch(err => res.json(err));
    res.send(areas);
};

areaController.newArea = (req, res) => {
    let area = new KBMDLS.areaModel();
    area.nombre = req.body.nombre;
    
    area.save((err, areaGuardada) => {
        if (err) res.status(500).send({message: 'No se pudo guardar area'})
        res.status(200).send({area: areaGuardada})
    })
};

areaController.editArea = async(req, res) => {
    const id = req.params.id;
    const area = { "nombre": req.body.nombre };
    const editArea = await KBMDLS.areaModel.findByIdAndUpdate(id, {$set: area}, {new: true})
                                            .catch(err => res.json(err));
    res.send(editArea);
};

areaController.removeArea = async(req, res) => {
    const id = req.params.id;
    const removeArea = await KBMDLS.areaModel.findByIdAndDelete(id)
                                            .catch(err => res.json(err));
    res.send(removeArea);
};

module.exports = areaController;