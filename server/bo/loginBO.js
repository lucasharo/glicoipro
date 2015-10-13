var util = require('./utilitario');
var loginModel = require('../modules/loginModel');

exports.index = function (req, res) {     
    res.render('login');
}

exports.login = function (req, res) {
    var medico = JSON.parse(JSON.stringify(req.body));

    loginModel.login(medico.usuario, medico.senha, function (e, medicoResultado) {
        if (e) {
            res.status(400).send(e);
        } else {
            medicoResultado.senha = "";
            res.status(200).send(medicoResultado);
        }
    });
}