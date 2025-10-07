// 19. Desde el primer div.info, subir a la tarjeta y bajar a la primera imagen
const primerInfo = document.querySelector('.info');

if (primerInfo) {
  const tarjetaPadre = primerInfo.parentElement;
  const imagenPrimera = tarjetaPadre.querySelector('img');
  console.log(imagenPrimera);
}
