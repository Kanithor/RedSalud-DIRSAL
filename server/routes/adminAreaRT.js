const express = require('express');
const router = express.Router();

const areaController = require('../controllers/areaCTRL');

//Archivo de rutas en las cuales debe incurrir el sistema para gestionar áreas

router.get('/', areaController.getAreas);
router.get('/getArea/', areaController.getArea);
router.get('/getArea/:id', areaController.getAreaById);
router.post('/newarea', areaController.newArea);
router.put('/editArea/:id', areaController.editArea);
router.delete('/deletearea/:id', areaController.removeArea);

module.exports = router;