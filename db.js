const mysql = require('mysql2');

// Configura los datos de conexión según los datos que ves en HeidiSQL
const connection = mysql.createConnection({
    host: 'localhost',     // o la IP que uses en HeidiSQL
    user: 'root',     // por ejemplo 'root'
    password: 'admin',
    database: 'gestion_personal',
    port: 3306              // Puerto por defecto de MySQL/MariaDB
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

module.exports = connection;
