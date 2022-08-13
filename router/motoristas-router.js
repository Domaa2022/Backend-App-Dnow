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

//servicio para obtener un motorista por su id
router.get('/:id', function(req, res,) {
    motorista.find({_id:req.params.id})
    .then( (data) => {
        res.send(data[0]);
        res.end();
    }).catch(err => {
        res.send(err);
        res.end();
    }
    )
}
);






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
});


//servicio para crear un nuevo motorista 
router.post('/', function(req,res,){
    let m = new motorista({
        nombre: req.body.nombre,
         correo: req.body.correo,
         contraseña: req.body,contraeña,
         estado: req.body.estado,
         latitud: req.body.latitud,
         longitud: req.body.longitud, 
         ordenes: req.body.ordenes,
         pedidos: req.body.pedidos,
         matricula: req.body.matricula   
    });
        m.save()
        .then( (data)=> {
            res.send(data);
            res.end();
        }).catch(err=> {
            res.send(err);
            res.end();
        });
});


module.exports = router;