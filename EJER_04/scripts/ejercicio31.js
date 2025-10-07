// 31. En la tarjeta de React, añadir texto al párrafo oculto
const tarjetaReact31 = [...document.querySelectorAll('.curso')].find(curso => {
  const h2 = curso.querySelector('h2');
  return h2 && h2.textContent.includes('React');
});

if (tarjetaReact31) {
  const parrafoOculto31 = tarjetaReact31.querySelector('p.oculto');
  if (parrafoOculto31) {
    parrafoOculto31.textContent += ' (¡Oferta especial!)';
  }
}
