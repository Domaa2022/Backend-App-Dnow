var express = require('express');
var router = express.Router();
var motorista = require('../models/motorista');
var mongoose = require('mongoose');

//servicio para datos login
router.get('/',function(req, res, ){
    motorista.find({})
    .then( (data)=> {
        res.send(data);
        res.end();
    })
    .catch(err => {
        res.send(err);
        res.end();
    })
});



//Actualizar la ubicacion del motorista

router.put('/:id', (req,res) => {
    motorista.updateOne(
        {
            _id: req.params.id
        },
        {
            $set : {
                latitud : req.body.latitud,
                longitud: req.body.longitud
            }

        }
    
        ).then( result => {
            res.send(result);
            res.end()

        }).catch(err => {
            res.send("hola")
            res.end()
        }) 
})