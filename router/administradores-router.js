var express = require('express');
var router = express.Router();
var usuario = require('../models/usuario');
var categoria = require('../models/categoria');
var motorista = require('../models/motorista');
var administrador = require('../models/administrador');
var mongoose = require('mongoose');
var multer = require('multer')

//Funciones para obtener imagenes y guardarlas en el servidor
const storage = multer.diskStorage({
    destination:'./public/img/',
    filename :  (req,file,cb) => {
        cb(null,file.originalname);
    }
})

var upload = multer({storage:storage})
var multipleUpload = upload.fields([{name:'imagen',maxCount:1},{name:'imagen2',maxCount:1}])


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

//Ruta para crear una categoria 
router.post('/:id', multipleUpload, (req,res) => {
    let u = {
        nombreEmpresa: req.body.nombreEmpresa,
        descripcion: req.body.Descripcion,
        logo: `http://localhost:3000/img/${req.files.imagen[0].filename}`,
        banner: `http://localhost:3000/img/${req.files.imagen2[0].filename}`,
        productos: []

    }
    categoria.find({_id:req.params.id}).then(result =>{
        result[0].empresas.push(u)
        result[0].save()
        res.send(result[0])
        res.end();
    }).catch(err => {
        res.send(err)
        res.end()
    }
    )

})

//Ruta para actualizar una categoria
router.put('/:id/:nombreEmpresa', multipleUpload, (req,res) => {
    console.log(req.params.nombreEmpresa)
    console.log(req.params.id)
    
    categoria.updateOne({_id:req.params.id, "empresas.nombreEmpresa":req.params.nombreEmpresa},{$set: {
        "empresas.$.nombreEmpresa": req.body.nombreEmpresa,
        "empresas.$.descripcion": req.body.Descripcion,
        "empresas.$.logo": `http://localhost:3000/img/${req.files.imagen[0].filename}`,
        "empresas.$.banner": `http://localhost:3000/img/${req.files.imagen2[0].filename}`,
    }})
    .then(result =>{
        res.send(result)
        res.end();
    }
    ).catch(err => {
        res.send(err)
        res.end()
    })
})


//Ruta para eliminar una categoria
router.delete('/:id/:indiceEmpresa', (req,res) => {
    categoria.find({_id:req.params.id}).then(result =>{
        result[0].empresas.splice(req.params.indiceEmpresa,1)
        result[0].save()
        res.send(result[0])
        res.end();
    }).catch(err => {
        res.send(err)
        res.end()
    }
    )
}
)

// ruta para crear un producto 
router.post('/:idCategoria/productos/:idEmpresa', multipleUpload, (req,res) => {
    let u = {
        nombreProducto: req.body.nombreProducto,
        precio : req.body.precioProducto,
        imagen : `http://localhost:3000/img/${req.files.imagen[0].filename}`,
    }
    categoria.find({_id:req.params.idCategoria}, )
    .then(result =>{
        result[0].empresas[req.params.idEmpresa].productos.push(u)
        result[0].markModified('empresas');
        result[0].save().then(result =>{
            res.send("Producto creado")
            res.end();  
        }).catch(err => {
            res.send(err)
            res.end()
        })
        
    })
    .catch(err => {
            res.send(err)
            res.end()
        
    })
    }

)

// ruta para eliminar un producto
router.delete('/:idCategoria/:idEmpresa/:indiceProducto', (req,res) => {
    categoria.find({_id:req.params.idCategoria}).then(result =>{
        result[0].empresas[req.params.idEmpresa].productos.splice(req.params.indiceProducto,1)
        result[0].markModified('empresas');
        result[0].save().then(result =>{
            res.send("Producto eliminado")
            res.end();  
        }).catch(err => {
            res.send(err)
            res.end()
        }
        )
    }).catch(err => {
        res.send(err)
        res.end()
    }
    )

})

// ruta para actializar un producto
router.put('/:idCategoria/:idEmpresa/:indiceProducto', multipleUpload, (req,res) => {
    categoria.find({_id:req.params.idCategoria}).then(result =>{
        result[0].empresas[req.params.idEmpresa].productos[req.params.indiceProducto].nombreProducto = req.body.nombreProducto
        result[0].empresas[req.params.idEmpresa].productos[req.params.indiceProducto].precio = req.body.precioProducto
        result[0].empresas[req.params.idEmpresa].productos[req.params.indiceProducto].imagen = `http://localhost:3000/img/${req.files.imagen[0].filename}`
        result[0].markModified('empresas');
        result[0].save().then(result =>{
            res.send("Producto actualizado")
            res.end();  
        }
        ).catch(err => {
            res.send(err)
            res.end()
        }
        )
    })

})


//servicio para denegar y rliminar motoristas 

router.delete('/:id', (req,res) => {
    motorista.find({_id})
    
    .thenn(result =>{
       result[0].motoristas.splice(0, result[0].motoristas.length)
       ressult[0].save()
       result.send(reult[0])
       res.end(); 
    }).catch(err => {
        res.send(err)
        res.end()
    })

})




module.exports = router;