let libros = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", paginas: 417 },
  { id: 2, titulo: "Don Quijote", autor: "Miguel de Cervantes", paginas: 863 },
  { id: 3, titulo: "1984", autor: "George Orwell", paginas: 328 },
  { id: 4, titulo: "Crimen y castigo", autor: "Fiódor Dostoyevski", paginas: 671 },
  { id: 5, titulo: "El principito", autor: "Antoine de Saint-Exupéry", paginas: 96 },
  { id: 6, titulo: "Rayuela", autor: "Julio Cortázar", paginas: 518 },
  { id: 7, titulo: "La Odisea", autor: "Homero", paginas: 541 },
  { id: 8, titulo: "Fahrenheit 451", autor: "Ray Bradbury", paginas: 256 },
  { id: 9, titulo: "El Aleph", autor: "Jorge Luis Borges", paginas: 157 },
  { id: 10, titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón", paginas: 565 },
];

function agregarLibro(nuevoLibro) {
  libros.push(nuevoLibro);
}

function obtenerLibros() {
  return libros;
}

// Exportar funciones
module.exports = {
  agregarLibro,
  obtenerLibros,
};

function buscarLibro(id) {
  return libros.find(libro => libro.id === id);
}

function eliminarLibro(id) {
  const index = libros.findIndex(libro => libro.id === id);
  if (index !== -1) {
    libros.splice(index, 1);
  }
}

module.exports = {
  agregarLibro,
  obtenerLibros,
  buscarLibro,
  eliminarLibro
};
