// 28. Crear array con texto de todas las categorías y mostrar en consola
const categorias = [...document.querySelectorAll('.curso .categoria')]
  .map(cat => cat.textContent.trim());

console.log(categorias);
