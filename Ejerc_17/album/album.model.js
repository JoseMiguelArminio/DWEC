let albumes = [
  {
    id: 1,
    titulo: 'A Night at the Opera',
    anio: 1975,
    artistaId: 1,
    foto: 'https://picsum.photos/id/212/150/150'
  }
];

module.exports = {
  getAll: () => albumes,
  getByArtista: id => albumes.filter(a => a.artistaId == id),
  delete: id => albumes = albumes.filter(a => a.id != id),
  add: album => albumes.push(album)
};
