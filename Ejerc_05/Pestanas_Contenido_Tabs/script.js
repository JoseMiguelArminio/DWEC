const contenedorBotones = document.getElementById('botones-pestanas');
const contenidos = document.querySelectorAll('.contenido');

contenedorBotones.addEventListener('click', (evento) => {
  if (evento.target.tagName === 'BUTTON') {
    contenidos.forEach(div => div.classList.add('oculto'));

    const idContenido = evento.target.getAttribute('data-id');
    const divMostrar = document.getElementById(idContenido);
    divMostrar.classList.remove('oculto');
  }
});
