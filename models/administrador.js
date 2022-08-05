var mongoose = require('mongoose');

var esquema = new mongoose.Schema ({
    nombre: String,
    correo: String, 
    contraseña:String,
   
})

module.exports = mongoose.model('administradores',esquema)
