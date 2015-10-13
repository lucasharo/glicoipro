var util = require('./utilitario');
var pacienteModel = require('../modules/pacienteModel');

exports.listarPacientes = function (req, res) {
    pacienteModel.listarPacientes(function (e, pacientes) {
        if (e) {
            res.status(400).send(e);
        } else {
            res.status(200).send(pacientes);
        }
    });
};

exports.listarMedicoes = function (req, res) {
    var paciente = req.params.paciente;

    pacienteModel.listarMedicoes(paciente, function (e, pacientes) {
        if (e) {
            res.status(400).send(e);
        } else {
            res.status(200).send(pacientes);
        }
    });
};

exports.cadastrarPaciente = function (req, res) {
    var paciente = JSON.parse(JSON.stringify(req.body));

    var novoPaciente = {
        nm: paciente.nome,
        user: paciente.usuario,            
        senha: paciente.senha,
        dtNasc: paciente.dtNasc,
        sex: paciente.sexo
    }
    
    pacienteModel.cadastrarPaciente(
        novoPaciente,
        function (e) {
            if (e) {
                res.status(400).send(e);
            } 
            else {
                res.status(200).send();
            }
        });
};

exports.deletarPaciente = function (req, res) {
    var id = req.params.id;

    pacienteModel.deletarUsuario(id, function (e) {
        if (e) {
			res.send(e, 400);            
        } else {
			res.status(200).send();
        }
    });
}