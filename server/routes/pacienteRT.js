const express = require('express');
const router = express.Router();

const pacienteCTRL = require('../controllers/pacienteCTRL');

//Archivo de rutas en las cuales debe incurrir el sistema para gestionar pacientes

router.get('/', pacienteCTRL.getPacientes);
router.get('/getPaciente/', pacienteCTRL.getPaciente);
router.get('/getPaciente/:id', pacienteCTRL.getPacienteById);
router.post('/newPaciente', pacienteCTRL.newPaciente);
router.post('/newPacientes', pacienteCTRL.newPacientes);
router.put('/editPaciente/:id', pacienteCTRL.editPaciente);
// Método PUT debido a que paciente seguirá en sistema, pero tendrá el flag de inactivo
router.put('/deletePaciente/:id', pacienteCTRL.removePaciente);

module.exports = router;