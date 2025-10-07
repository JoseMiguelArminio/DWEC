// 27. Aplicar borde punteado a cursos que NO son premium
tarjetasCursos.forEach(tarjeta => {
  if (!tarjeta.classList.contains('premium')) {
    tarjeta.style.border = '2px dotted black';
  }
});
