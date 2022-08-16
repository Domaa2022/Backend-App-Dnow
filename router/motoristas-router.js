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
        nombreMotorista: req.body.nombre,
        correo: req.body.correo,
        contraseña: req.body.contraseña,
        estado: req.body.estado,
        latitud: req.body.latitud,
        longitud: req.body.longitud, 
        ordenesPendientes: req.body.ordenesPendientes,
        ordenesFinalizadas: req.body.ordenesFinalizadas,
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

router.put('/:id/:disponible', (req,res) => {
    let u = {
        Estado : req.body.Estado,
        recibe : req.body.recibe,
        correo : req.body.correo,
        correoMotorista: req.body.correoMotorista,
        numeroPedido : req.body.numeroPedido,
        usuario : req.body.usuario,
        productos: req.body.productos,
    }
    motorista.find({_id:req.params.id}).
    then( (data)=> {
        data[0].ordenesPendientes.push(u);
        data[0].estado = req.params.disponible;
        data[0].markModified('ordenesPendientes');
        data[0].save()
        res.send(data);
    }).catch(err => {
        res.send(err);
        res.end();
    }
    )
})

router.put('/:id/entregado/:disponible', (req,res) => {
    let u = {
        Estado : req.body.Estado,
        recibe : req.body.recibe,
        correo : req.body.correo,
        correoMotorista: req.body.correoMotorista,
        numeroPedido : req.body.numeroPedido,
        usuario : req.body.usuario,
        productos: req.body.productos,
    }
    motorista.find({_id:req.params.id}).
    then( (data)=> {
        data[0].ordenesPendientes.splice(data[0].ordenesPendientes[0],1);
        data[0].ordenesFinalizadas.push(u);
        data[0].estado = req.params.disponible;
        data[0].markModified('ordenesFinalizadas');
        data[0].save()
        res.send(data[0]);
    }).catch(err => {
        res.send(err);
        res.end();
    }
    )
})


module.exports = router;