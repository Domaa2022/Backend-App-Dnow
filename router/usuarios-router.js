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

//servicio para obtener un usuario por su id
router.get('/:id', function(req, res,) {
    usuario.find({_id:req.params.id})
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
        imagenProducto : req.body.imagen,
        cantidad : req.body.cantidad,
        descripcion : req.body.descripcion
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

//servicio para guardar un pedido de un usuario 
router.post('/pedido/:id' , function(req,res){
    let pedido = {
        numeroPedido : req.body.numeroPedido,
        usuario : req.body.usuario,
        correo : req.body.correo,
        fechaPago: req.body.fechaPago,
        precioPedido: req.body.precioPedido,
        ISV: req.body.ISV,
        precioTotal: req.body.PrecioTotal,
        productos : req.body.productos,
        Estado : req.body.Estado,
        fechaEntrega: req.body.fechaPago,
        Recibe: req.body.Recibe,
        correoMotorista:req.body.correoMotorista

    }
    usuario.find({_id:req.params.id})
    .then(result => {
        result[0].pedidos.push(pedido)
        result[0].save()
        res.send(result[0])
        res.end();
    }).catch(err => {
        res.send(err)
        res.end()
    })
})



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

// servicio para eliminar ordenes ya hechas pedido 

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

//Actualizar la ubicacion del usuario

router.put('/:id', (req,res) => {
    usuario.updateOne(
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




module.exports = router;