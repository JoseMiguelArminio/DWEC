// 26. Añadir párrafo con duración al final de la sección info de cada curso
tarjetasCursos.forEach(tarjeta => {
  const info = tarjeta.querySelector('.info');
  if (info) {
    const duracion = document.createElement('p');
    duracion.classList.add('duracion');
    duracion.textContent = 'Duración: 20 horas';
    info.appendChild(duracion);
  }
});
