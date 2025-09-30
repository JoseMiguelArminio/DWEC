const {
  hayLibrosLargos,
  todosSonLibrosCortos
} = require('./biblioteca');

console.log("¿Hay libros con más de 500 páginas?", hayLibrosLargos(500));
console.log("¿Todos los libros tienen menos de 1000 páginas?", todosSonLibrosCortos(1000));

