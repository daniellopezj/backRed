var express = require('express');
var app = express();
var morgan = require('morgan');
var routes = require('./routes/router');


//MENSAJES CABEZERA A CADA SERVICIO
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

//Control CORS
app.use(allowCrossDomain);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


// DONDE ESCUCHA EL SERVIDOR
app.listen(3001, function() {
    console.log('app listening on port 3001!');
});

//hacer llamado a enrutador
routes.assignRoutes(app);


//MANEJO DE ERRORES 
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Se presento un problema!');
});

module.exports = app;