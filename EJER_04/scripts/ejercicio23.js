// 23. Al hacer clic en el título del curso de React, mostrar el párrafo oculto
const tarjetaReact = [...document.querySelectorAll('.curso')].find(curso => {
  const h2 = curso.querySelector('h2');
  return h2 && h2.textContent.includes('React');
});

if (tarjetaReact) {
  const tituloReact = tarjetaReact.querySelector('h2');
  const parrafoOculto = tarjetaReact.querySelector('p.oculto');

  if (tituloReact && parrafoOculto) {
    tituloReact.style.cursor = 'pointer'; // Indicativo que se puede clicar
    tituloReact.addEventListener('click', () => {
      parrafoOculto.style.display = parrafoOculto.style.display === 'none' ? 'block' : 'none';
    });
  }
}
