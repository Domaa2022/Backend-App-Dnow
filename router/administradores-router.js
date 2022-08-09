var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var motorista = require('../models/motorista');
var administrador = require('../models/administrador');
var mongoose = require('mongoose');

//servicio para datos login
router.get('/',function(req, res, ){
    administrador.find({})
    .then( (data)=> {
        res.send(data);
        res.end();

    })
    .catch(err => {
        res.send(err);
        res.end();
    })
});

//servicio para obtener un motorista por su id
router.get('/:id', function(req, res,) {
    motorista.find({_id:req.params.id})
    .then( (data) => {
        res.send(data[0]);
        res.end();
    })
    .catch(err => {
        res.send(err);
        res.end();
    })
}
);

// servicio para eliminar una orden 
router.delete('/:id/:indiceProducto', (req,res)  => {
    let indiceProducto = req.params.indiceProducto
    usuario.find({_id:req.params.id})
    .then(result => {
        result[0].ordenes.splice(indiceProducto,1);
        result[0].save()
        res.send(result[0])
        res.end();
    })
    .catch(err => {
        res.send(err)
        res.end()
    }) 
} )

router.delete('/:id' ,(req,res) =>{
    usuario.find({_id:req.params.id})
    .then(result => {
        result[0].ordenes.splice(0, result[0].ordenes.length)
        result[0].save()
        res.send(result[0]) 
        res.end();
    }).catch(err => {
        res.send(err)
        res.end()
    }) 
})


module.exports = router;