const express = require('express');
const router = express.Router();

const klbController = require('../controllers/knowledgebaseCTRL');

//Archivo de rutas en las cuales debe incurrir el sistema para gestionar áreas

router.get('/', klbController.getPregunta);
router.get('/getPregunta/', klbController.getPregunta);
router.get('/getPregunta/:id', klbController.getPreguntaById);
router.get('/getArea/', klbController.getArea);
router.get('/getArea/:id', klbController.getAreaById);
router.get('/getRespuesta/:id', klbController.getRespuestaById);
router.post('/newPregunta', klbController.newPregunta);
router.post('/newArea', klbController.newArea);
router.post('/newRespuesta', klbController.newRespuesta);
router.put('/editPregunta/:id', klbController.editPregunta);
router.put('/editArea/:id', klbController.editArea);
router.put('/editRespuesta/:id', klbController.editRespuesta);
router.delete('/deleteArea/:id', klbController.removeArea);
router.delete('/deletePregunta/:id', klbController.removePregunta);
router.delete('/deleteRespuesta/:id', klbController.removeRespuesta);

module.exports = router;