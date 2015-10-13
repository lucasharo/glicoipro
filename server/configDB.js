var mongojs = require('mongojs');

var url = "localhost:27017";
var databaseName = "glicoipro";

var uri = "mongodb://" + url + "/" + databaseName;

if(process.env.VCAP_SERVICES){
	var env = JSON.parse(process.env.VCAP_SERVICES);
	uri = env['mongolab'][0]['credentials']['uri'];	
}

module.exports.db = mongojs(uri);