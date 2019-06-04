const KBMDLS = require('../models/knowledgebaseMDL');
const areaController = {};

areaController.getArea = async(req, res) => {
    id = req.body.id;
    const area = await KBMDLS.areaModel.findOne({ id : "id" })
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

areaController.editArea = (req, res) => {
    res.json({
        status: 'Ruta funcionando'
    })
};

areaController.removeArea = (req, res) => {
    res.json({
        status: 'Ruta funcionando'
    })
};

module.exports = areaController;