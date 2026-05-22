const Libro = require('../models/Libro');
const Prestamo = require('../models/Prestamo');

exports.index = async (req, res) => {
  const [libros] = await Libro.getAll();
  res.render('index', { libros });
};

exports.detalle = async (req, res) => {
  const id = req.params.id;
  const [[libro]] = await Libro.getById(id);
  const [historial] = await Prestamo.getHistorialLibro(id);

  const prestamoActivo = historial.find(p => p.fecha_entrega === null);

  res.render('libroDetalle', {
    libro,
    historial,
    prestamoActivo
  });
};
