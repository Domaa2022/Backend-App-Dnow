var mongoose = require('mongoose');
let bd = 'AppCliente';
let port ='27017' ;
let host = 'localhost';



class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect('mongodb+srv://VictorBarahona:Vb00170@cluster0.ys9jn.mongodb.net/AppCliente').then(() => {
            console.log('Conexion a la base de datos establecida');
        }).catch(err => {
            console.log('Error al conectar a la base de datos');
        }   );
    }
}

module.exports = new Database;