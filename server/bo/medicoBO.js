var util = require('./utilitario');
var medicoModel = require('../modules/medicoModel');

var listarMedicos = function (callback) {
    medicoModel.listarMedicos(function (e, medicos) {
        if (e) {
            callback(e);
        } else {
            callback(null, medicos);
        }
    });
};

exports.cadastrarMedico = function (req, res) {
    var medico = JSON.parse(JSON.stringify(req.body));

    var novoMedico = {
        nm: medico.nome,
        user: medico.usuario,            
        senha: medico.senha,
        crm: medico.crm,
        email: medico.email,
        tels: medico.telefones
    }
    
    medicoModel.cadastrarMedico(
        novoMedico,
        function (e) {
            if (e) {
                res.status(400).send(e);
            } 
            else {
                res.status(200).send();
            }
        });
};

exports.atualizarMedico = function (req, res) {
    var medico = JSON.parse(JSON.stringify(req.body));
    
    var medicoAlterado = {
        nm: medico.nome,
        user: medico.usuario,            
        senha: medico.senha,
        crm: medico.crm,
        email: medico.email,
        tels: medico.telefones
    }
    
    medicoModel.atualizarMedico(
        medicoAlterado,
        function (e, medicoResultado) {
            if (e) {
                res.status(400).send(e);
            } 
            else {
                var medico = {
                    nome: medicoResultado.nm,
                    email: medicoResultado.email,
                    crm: medicoResultado.crm,
                    usuario: medicoResultado.user,
                    telefones: medicoResultado.tels
                }

                res.status(200).send(medico);
            }
        });
};

exports.validarNovoMedico = function (req, res) {
    var medico = JSON.parse(JSON.stringify(req.body));

    medicoModel.validarNovoMedico(
        medico.usuario,
        function (e) {
            if (e) {
                res.status(400).send(e);
            } 
            else {
                res.status(200).send();
            }
        });
};

exports.deletarMedico = function (req, res) {
    var id = req.params.id;

    medicoModel.deletarMedico(id, function (e) {
        if (e) {
			res.send(e, 400);            
        } else {
			res.status(200).send();
        }
    });
};