const express = require('express');
const router = express.Router();

const areaController = require('../controllers/areaCTRL');

//Archivo de rutas en las cuales debe incurrir el sistema al solicitar la creación de nueva pregunta

router.get('/', areaController.getAreas);


module.exports = router;