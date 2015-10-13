/*eslint-env node*/
var express 	= require('express'),
    favicon     = require('serve-favicon'),
    bodyParser  = require('body-parser'),
    cfenv = require('cfenv'),
    app     	= express();
    
app.set('views', __dirname + '/web/views');
app.set('view engine', 'ejs');
app.locals.pretty = true;
app.use(favicon(__dirname + '/web/public/img/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/web/public'));

var appEnv = cfenv.getAppEnv();

app.use(require('./server/router'));

var index = function (req, res) {
	res.render('index');
};

app.get('/', index);

app.listen(appEnv.port, function() {
	console.log("Servidor executado com sucesso!");
	console.log(appEnv.url);
});
