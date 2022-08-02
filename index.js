var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var database = require('./modules/database')
var usuariosRouter = require('./router/usuarios-router');
var categoriaRouter = require('./router/categorias-router')
var app = express();

//Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/usuarios',usuariosRouter);
app.use('/categorias',categoriaRouter);


app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.listen(3000, function () {
    console.log('Example app listning on port 3000!');
})