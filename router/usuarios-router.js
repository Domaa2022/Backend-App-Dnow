var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario')
var mongoose = require('mongoose');

//Servicio para obtener correo y contraseña de un usuario
router.get('/', function(req, res,) {
    usuario.find({})
    .then( (data) => {
        res.send(data);
        res.end();
    })
    .catch(err => {
        res.send(err);
        res.end();
    })
});

//servicio para crear un usuario
router.post('/', function(req, res,) {
    let u = new usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        ordenes: req.body.ordenes,
        pedidos: req.body.pedidos,
        metodoPago: req.body.metodoPago
    });
    u.save()
    .then( (data) => {
        res.send(data);
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    });

});

//servicio para guardar una orden de un usuario
router.post('/:id', function(req, res,) {
    let u =  {
        nombreProducto : req.body.nombreProducto,
        precio : req.body.precio * req.body.cantidad,
        imagen : req.body.imagen,
        cantidad : req.body.cantidad,
    }
    usuario.find({_id:req.params.id})
    .then(result =>{
        result[0].ordenes.push(u);
        result[0].save();
        res.send(result[0])
        res.end();
    })
    .catch(err => {
        res.send(err)
        res.end()
    }) 
}
)

module.exports = router;