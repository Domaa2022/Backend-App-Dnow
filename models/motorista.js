var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre: String,
    correo: String,
    contraseña: String,
    estado: String,
    latitud: String,
    longitud: String, 
    ordenes: Array,
    pedidos: Array,
    matricula: String,
})

module.exports = mongoose.model('motoristas',esquema)