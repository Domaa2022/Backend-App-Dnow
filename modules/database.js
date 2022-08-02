var mongoose = require('mongoose');
let bd = 'AppCliente';
let port ='27017' ;
let host = 'localhost';


class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect(`mongodb://${host}:${port}/${bd}`).then(() => {
            console.log('Conexion a la base de datos establecida');
        }).catch(err => {
            console.log('Error al conectar a la base de datos');
        }   );
    }
}

module.exports = new Database;