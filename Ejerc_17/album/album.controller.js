const albumModel = require('./album.model');
const artistaModel = require('../artista/artista.model');

exports.list = (req, res) => {
  const albumes = albumModel.getAll().map(a => ({
    ...a,
    artista: artistaModel.getById(a.artistaId)?.nombre || 'Desconocido'
  }));
  res.render('album/list', { albumes });
};

exports.delete = (req, res) => {
  albumModel.delete(req.params.id);
  res.redirect('/albumes');
};

exports.form = (req, res) => {
  res.render('album/form', {
    artistas: artistaModel.getAll(),
    error: null
  });
};

exports.save = (req, res) => {
  const { titulo, anio, artistaId, foto } = req.body;

  if (!titulo || !anio) {
    return res.render('album/form', {
      artistas: artistaModel.getAll(),
      error: 'Título y año son obligatorios'
    });
  }

  albumModel.add({
    id: Date.now(),
    titulo,
    anio,
    artistaId,
    foto
  });

  res.redirect('/albumes');
};
