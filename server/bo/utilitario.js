var ObjectId = require("mongojs").ObjectId;
var crypto = require('crypto');

var generateSalt = function () {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
    var salt = '';
    for (var i = 0; i < 10; i++) {
        var p = Math.floor(Math.random() * set.length);
        salt += set[p];
    }
    return salt;
}

var md5 = function (str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

exports.validarSenha = function (plainPass, hashedPass, callback) {
    var salt = hashedPass.substr(0, 10);
    var validHash = salt + md5(plainPass + salt);

    if (hashedPass === validHash)
        return callback(null, hashedPass === validHash);
    
    return callback('Senha inválida');
}

exports.saltAndHash = function (senha, callback) {
    var salt = generateSalt();
    callback(salt + md5(senha + salt));
}

exports.getObjectId = function (id) {
    return db.usuario.db.bson_serializer.ObjectID.createFromHexString(id)
}