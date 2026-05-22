const db = require('../config/db');

exports.getAll = () => {
  return db.query('SELECT * FROM libros');
};

exports.getById = (id) => {
  return db.query('SELECT * FROM libros WHERE id = ?', [id]);
};

exports.updateEstado = (id, estado) => {
  return db.query(
    'UPDATE libros SET estado = ? WHERE id = ?',
    [estado, id]
  );
};
