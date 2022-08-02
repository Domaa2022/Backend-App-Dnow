var express = require ('express')
var router = express.Router();
var categoria = require('../models/categoria')
var mongoose = require('mongoose')

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


module.exports= router