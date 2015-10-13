var db 	= require('../configDB').db;

exports.paciente = db.collection('paciente');

exports.medico = db.collection('medico');