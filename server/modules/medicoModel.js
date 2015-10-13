var util = require('../bo/utilitario');
var db = require('./tabelas');

exports.listarMedicos = function (callback) {
    db.medico.find().toArray(
        function (e, medicos) {
            if (e) callback(e)
            else callback(null, medicos)
        });
}

var validarNovoMedico = function (usuario, callback) {
    db.medico.findOne({ user: usuario }, { '1': 1, _id: 0 }, function (e, res) {
        if (res) {
            callback(true);
        } else {
            callback(null);
        }
    });
}

exports.cadastrarMedico = function (medico, callback) {
    validarNovoMedico(medico.user, function (e, res) {
        if (e) {
            callback('Usuário já cadastrado');
        } else {
            util.saltAndHash(medico.senha, function (hash) {
                medico.senha = hash;
                db.medico.insert(medico, callback);
            });
        }
    });
}

exports.atualizarMedico = function (medico, callback) {
    db.medico.findOne({ user: medico.user }, function (e, medicoResultado) {
        if (e) {
            callback('Usuário não cadastrado');
        } else {
            medicoResultado.nm = medico.nm;
            medicoResultado.user = medico.user;
            medicoResultado.crm = medico.crm;
            medicoResultado.email = medico.email;
            medicoResultado.tels = medico.tels;

            util.saltAndHash(medico.senha, function (hash) {
                if (medico.senha != "" && medico.senha != undefined)
                    medicoResultado.senha = hash;
                                
                db.medico.save(medicoResultado, callback);
            });
        }
    });
}

exports.atualizarSenha = function (usuario, senha, callback) {
    db.medico.findOne({ user: usuario }, function (e, medicoRes) {
        if (e) {
            callback(e, null);
        } else {
            util.saltAndHash(senha, function (hash) {
                medicoRes.senha = hash;
                db.medico.save(medicoRes, { safe: true }, callback);
            });
        }
    });
}

exports.deletarMedico = function (id, callback) {
    db.medico.remove({ _id: ObjectId(id) }, callback);
}

exports.validateResetLink = function (email, passHash, callback) {
    db.medico.find({ $and: [{ email: email, senha: passHash }] }, function (e, usuario) {
        callback(usuario ? 'ok' : null);
    });
}

exports.validarNovoMedico = validarNovoMedico;