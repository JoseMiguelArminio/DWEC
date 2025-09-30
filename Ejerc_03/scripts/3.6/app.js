const {
  obtenerLibros,
  ordenarPorPaginas
} = require('./biblioteca');

console.log("Antes de ordenar:");
console.log(obtenerLibros());

ordenarPorPaginas();

console.log("\nDespués de ordenar:");
console.log(obtenerLibros());
