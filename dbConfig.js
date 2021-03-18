const mysql = require('mysql')

//Conexión con BD
const connect = () => {
    const pool = mysql.createPool({
        host: '127.0.1',
        user: 'root',
        password: 'root',
        port: 8889,
        database: 'eventwise'
    });

    global.db = pool;

}

module.exports = connect;