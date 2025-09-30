const {
  agregarLibro,
  obtenerLibros,
  buscarLibro,
  eliminarLibro
} = require('./biblioteca');

console.log("Libros actuales:");
console.log(obtenerLibros());

const libroEncontrado = buscarLibro(3);
console.log("\nLibro con ID 3:");
console.log(libroEncontrado);

eliminarLibro(3);
console.log("\nLibros después de eliminar el ID 3:");
console.log(obtenerLibros());
