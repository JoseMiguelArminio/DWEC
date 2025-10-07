// 24. Añadir prefijo “[CURSO]” a todos los títulos h2 dentro de las tarjetas
const titulosCursos = document.querySelectorAll('.curso h2');

titulosCursos.forEach(titulo => {
  titulo.textContent = `[CURSO] ${titulo.textContent}`;
});
