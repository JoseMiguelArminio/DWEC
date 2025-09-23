import { crearProducto, filtrarPorCategoria, listarProductosAgotados, calcularValorTotalInventario, resumenInventario } from './inventario.js';

const inventario = [];
inventario.push(crearProducto('Laptop', 'Electrónica', 1200, 5));
inventario.push(crearProducto('Camiseta', 'Ropa', 20, 0));
inventario.push(crearProducto('Libro de JavaScript', 'Libros', 30, 10));
inventario.push(crearProducto('Auriculares', 'Electrónica', 100, 15));
inventario.push(crearProducto('Pantalones', 'Ropa', 40, 8));
inventario.push(crearProducto('Novela', 'Libros', 25, 0));
console.log('Productos en la categoría "Ropa":', filtrarPorCategoria(inventario, 'Ropa'));
console.log('Productos agotados:', listarProductosAgotados(inventario));
console.log('Valor total del inventario: $', calcularValorTotalInventario(inventario));
resumenInventario(inventario);
