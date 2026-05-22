const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'TU_PASSWORD',
  database: 'Biblioteca',
  port: 3306
});

module.exports = pool.promise();
