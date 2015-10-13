var express = require('express'),
    router = express.Router();

var loginBO = require('./bo/loginBO');
var pacienteBO = require('./bo/pacienteBO');
var medicoBO = require('./bo/medicoBO');

router.use('/public', express.static('public'));

router.get('/login', loginBO.index);
router.post('/login', loginBO.login);

router.post('/cadastrarPaciente', pacienteBO.cadastrarPaciente);
router.get('/listarPacientes', pacienteBO.listarPacientes);
router.get('/listarMedicoes/:paciente', pacienteBO.listarMedicoes);

router.post('/cadastrarMedico', medicoBO.cadastrarMedico);
router.post('/atualizarMedico', medicoBO.atualizarMedico);
router.post('/validarNovoMedico', medicoBO.validarNovoMedico);

module.exports = exports = router;