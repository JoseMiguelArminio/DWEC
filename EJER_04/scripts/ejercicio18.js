// 18. Desde el footer, localizar el contenedor anterior y aplicarle borde rojo
const footer = document.querySelector('footer');

if (footer) {
  const contenedorAnterior = footer.previousElementSibling;
  if (contenedorAnterior) {
    contenedorAnterior.style.border = '2px solid red';
  }
}
