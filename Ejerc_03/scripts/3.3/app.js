const { agregarLibro, obtenerLibros } = require('./biblioteca');

console.log("Libros iniciales:");
console.log(obtenerLibros());

agregarLibro({ id: 11, titulo: "El Hobbit", autor: "J.R.R. Tolkien", paginas: 310 });

console.log("\nLibros después de agregar uno nuevo:");
console.log(obtenerLibros());
