var express = require ('express')
var router = express.Router();
var categoria = require('../models/categoria')
var mongoose = require('mongoose')
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



//Ruta para obtener todas las categorias
router.get('/',(req,res) => {
    categoria.find({})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch(err => {
        res.send(err);
        res.end();
    })
    
})

// Obtener una categoria 
router.get('/:id', (req,res) =>{
    categoria.find({_id:req.params.id}).then(result =>{
        res.send(result[0])
        res.end();
    }).catch(err => {
        res.send(err)
        res.end()
    })
})

//obtener productos de una categoria
router.get('/:id/:idEmpresa', (req,res) =>{
    categoria.find({_id:req.params.id}).
    then(result =>{
        res.send(result[0].empresas[req.params.idEmpresa])
        res.end();
    })
    .catch(err => {
        res.send(err)
        res.end()
    })
})


//Ruta para eliminar una categoria


//Ruta para eliminar una categoria
router.delete('/:id/:a', (req,res) => {
    categoria.find({_id:req.params.id})
    .then(result => {
        result[0].empresas.splice(req.params.a,1);
        result[0].save()
        res.send(result[0])
        res.end();
    }).catch(err => {
        res.send(err)
        res.end()
    } )

})



    
module.exports= router