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
    metodoPago: Array
})

