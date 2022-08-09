var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var database = require('./modules/database')
var usuariosRouter = require('./router/usuarios-router');
var categoriaRouter = require('./router/categorias-router');
var motoristasRouter = require('./router/motoristas-router') ;
var administradoresRouter = require('./router/administradores-router') ;
var app = express();



//Middleware




app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/usuarios',usuariosRouter);
app.use('/categorias',categoriaRouter);
app.use('/motoristas', motoristasRouter)
app.use('/administradores', administradoresRouter)
app.use('/', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send('Hello World!');

})

app.listen(3000, function () {
    console.log('Example app listning on port 3000!');
})

/* 



*/


