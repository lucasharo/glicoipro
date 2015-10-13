var util = require('../bo/utilitario');
var db = require('./tabelas');

exports.login = function (usuario, senha, callback) {
    db.medico.findOne({ user: usuario }, function (e, medicoResultado) {
        if (medicoResultado == null) {
            callback('Usuário inválido');
        } else {
            util.validarSenha(senha, medicoResultado.senha, function (error, res) {
                if (error) {
                    callback(error);
                } else {
                    var medico = {
                            nome: medicoResultado.nm,
                            email: medicoResultado.email,
                            crm: medicoResultado.crm,
                            usuario: medicoResultado.user,
                            telefones: medicoResultado.tels
                    }

                    callback(null, medico);
                }
            });
        }
    });
}

exports.updatePassword = function (email, senha, callback) {
    db.usuario.findOne({ email: email }, function (e, usuario) {
        if (e) {
            callback(e, null);
        } else {
            saltAndHash(senha, function (hash) {
                usuario.senha = hash;
                db.usuario.save(usuario, { safe: true }, callback);
            });
        }
    });
}

exports.deleteAccount = function (id, callback) {
    db.usuario.remove({ _id: getObjectId(id) }, callback);
}

exports.getAccountByEmail = function (email, callback) {
    db.usuario.findOne({ email: email }, function (e, usuario) { callback(usuario); });
}

exports.validateResetLink = function (email, passHash, callback) {
    db.usuario.find({ $and: [{ email: email, senha: passHash }] }, function (e, usuario) {
        callback(usuario ? 'ok' : null);
    });
}