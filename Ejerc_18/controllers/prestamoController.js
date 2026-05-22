const Prestamo = require('../models/Prestamo');
const Libro = require('../models/Libro');

exports.prestados = async (req, res) => {
  const [prestados] = await Prestamo.getPrestados();
  res.render('prestados', { prestados });
};

exports.usuario = async (req, res) => {
  const nombre = req.query.nombre;
  const [prestamos] = await Prestamo.getPorUsuario(nombre);
  res.render('prestamosUsuario', { nombre, prestamos });
};

exports.formulario = (req, res) => {
  res.render('formularioPrestamo', { libro_id: req.params.libro_id });
};

exports.crear = async (req, res) => {
  await Prestamo.crear(req.body);
  await Libro.updateEstado(req.body.libro_id, 'Prestado');
  res.redirect(`/libro/${req.body.libro_id}`);
};

exports.devolver = async (req, res) => {
  const id = req.params.libro_id;
  await Prestamo.devolver(id);
  await Libro.updateEstado(id, 'Disponible');
  res.redirect(`/libro/${id}`);
};

exports.vencidos = async (req, res) => {
  const [vencidos] = await Prestamo.getVencidos();
  res.render('vencidos', { vencidos });
};
