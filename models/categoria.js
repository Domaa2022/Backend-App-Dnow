var mongoose = require('mongoose');

var esquemaCategoria = new mongoose.Schema ({
    nombreCategoria: String,
    imagen: String,
    empresas: Array
})

module.exports = mongoose.model('categorias',esquemaCategoria)