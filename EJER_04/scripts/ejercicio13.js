// 13. Cambiar la imagen del primer curso (JavaScript Moderno)
const primerCurso = document.querySelector('.curso'); // Asumiendo la clase 'curso' en cada tarjeta
const imagenCurso = primerCurso.querySelector('img');

if (imagenCurso) {
  imagenCurso.src = 'img/hacer4.jpg';
  imagenCurso.alt = 'Imagen actualizada del curso JavaScript Moderno';
}
