let artistas = [
  {
    id: 1,
    nombre: 'Queen',
    pais: 'Reino Unido',
    genero: 'Rock',
    fecha_formacion: 1970,
    foto: 'https://picsum.photos/id/10/150/150'
  }
];

module.exports = {
  getAll: () => artistas,
  getById: id => artistas.find(a => a.id == id),
  add: artista => artistas.push(artista),
  delete: id => artistas = artistas.filter(a => a.id != id)
};
