const express = require('express');
const router = express.Router();

const queueController = require('../controllers/queueCTRL');

router.get('/', queueController.getSolicitudes);
router.get('/getSolicitudes', queueController.getSolicitudes);
router.get('/getSolicitud/:id', queueController.getSolicitudById);
router.post('/newSolicitud', queueController.newSolicitud);
router.delete('/deleteSolicitud/:id', queueController.removeSolicitud);

module.exports = router;