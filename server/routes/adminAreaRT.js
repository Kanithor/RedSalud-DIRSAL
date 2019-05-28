const express = require('express');
const router = express.Router();

const areaController = require('../controllers/areaCTRL');

//Archivo de rutas en las cuales debe incurrir el sistema para gestionar áreas

router.get('/', areaController.getAreas);
router.get('/:id', areaController.getArea);
router.post('/newarea', areaController.newArea);
router.put('/edit/:id', areaController.editArea);
router.delete('/delete/:id', areaController.removeArea);

module.exports = router;