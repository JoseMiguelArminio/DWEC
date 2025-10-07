// 32. Añadir clase ‘imagen-curso’ a la imagen de cada tarjeta
const tarjetas32 = document.querySelectorAll('.curso');

tarjetas32.forEach(tarjeta => {
  const imagen = tarjeta.querySelector('img');
  if (imagen) {
    imagen.classList.add('imagen-curso');
  }
});
