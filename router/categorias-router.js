var express = require ('express')
var router = express.Router();
var categoria = require('../models/categoria')
var mongoose = require('mongoose')
var multer = require('multer')

const storage = multer.diskStorage({
    destination:'./public/img/',
    filename :  (req,file,cb) => {
        cb(null,file.originalname);
    }
})

var upload = multer({storage:storage})
var multipleUpload = upload.fields([{name:'imagen',maxCount:1},{name:'imagen2',maxCount:1}])

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
    
module.exports= router