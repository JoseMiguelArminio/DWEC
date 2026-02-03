const artistaModel = require('./artista.model');
const albumModel = require('../album/album.model');

exports.list = (req, res) => {
  res.render('artista/list', {
    artistas: artistaModel.getAll()
  });
};

exports.detail = (req, res) => {
  const artista = artistaModel.getById(req.params.id);
  const albumes = albumModel.getByArtista(req.params.id);

  res.render('artista/detail', { artista, albumes });
};

exports.form = (req, res) => {
  res.render('artista/form');
};

exports.save = (req, res) => {
  const artista = {
    id: Date.now(),
    nombre: req.body.nombre,
    pais: req.body.pais,
    genero: req.body.genero,
    fecha_formacion: req.body.fecha_formacion,
    foto: req.body.foto || 'https://picsum.photos/150'
  };

  artistaModel.add(artista);
  res.redirect('/artistas');
};

exports.delete = (req, res) => {
  artistaModel.delete(req.params.id);
  res.redirect('/artistas');
};
