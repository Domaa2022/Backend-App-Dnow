var mongoose = require('mongoose');

var esquema = new mongoose.Schema ({
    nombre: String,
    correo: String, 
    contraseña:String,
    latitud: String,
    longitud: String,
    ordenes:  Array,
    pedidos:  Array,
    metodoPago: Array   
})

module.exports = mongoose.model('usuarios',esquema)
