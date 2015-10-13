var util = require('../bo/utilitario');
var db = require('./tabelas');

exports.listarPacientes = function (callback) {
    db.paciente.find({}, { senha: 0, meds: 0 }).toArray(function (e, pacientes) {
        if (e) {
            callback(e)
        }
        else {
            callback(null, pacientes)
        }
    });
}

exports.listarMedicoes = function (paciente, callback) {
    db.paciente.findOne({ user: paciente }, { senha: 0 }, function (e, pacientes) {
        if (e) {
            callback(e)
        }
        else {
            callback(null, pacientes)
        }
    });
}

var validarNovoPaciente = function (paciente, callback) {
    db.paciente.findOne({ user: paciente.usuario }, { '1': 1, _id: 0 }, function (e, res) {
        if (res) {
            callback(e);
        } else {
            callback(null);
        }
    });
}

exports.cadastrarPaciente = function (paciente, callback) {
    validarNovoPaciente(paciente, function (e, res) {
        if (e) {
            callback('Usuário já cadastrado');
        } else {
            saltAndHash(paciente.senha, function (hash) {
                paciente.senha = hash;
                db.paciente.insert(paciente, { safe: true }, callback);
            });
        }
    });
}

exports.atualizarPaciente = function (paciente, callback) {
    db.paciente.findOne({ paciente: paciente.user }, function (e, pacienteRes) {
        pacienteRes.nm = paciente.nome;
        pacienteRes.sex = paciente.sexo;
        pacienteRes.dtNasc = paciente.dtNasc;
        
        db.paciente.save(pacienteRes, { safe: true }, function (err) {
            if (err) callback(err);
            else callback(null, pacienteRes);
        });
    });
}

exports.atualizarSenha = function (usuario, senha, callback) {
    db.paciente.findOne({ user: usuario }, function (e, pacienteRes) {
        if (e) {
            callback(e, null);
        } else {
            util.saltAndHash(senha, function (hash) {
                pacienteRes.senha = hash;
                db.paciente.save(pacienteRes, { safe: true }, callback);
            });
        }
    });
}

exports.deletarPaciente = function (id, callback) {
    db.usuario.remove({ _id: ObjectId(id) }, callback);
}

exports.validateResetLink = function (email, passHash, callback) {
    db.usuario.find({ $and: [{ email: email, senha: passHash }] }, function (e, usuario) {
        callback(usuario ? 'ok' : null);
    });
}