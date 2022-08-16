var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombreMotorista: String,
    correo: String,
    contraseña: String,
    estado: String,
    latitud: String,
    longitud: String, 
    ordenesPendientes: Array,
    ordenesFinalizadas: Array,
    matricula: String,

})

module.exports = mongoose.model('motoristas',esquema)