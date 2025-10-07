// 16. Desde el botón de la tarjeta premium, subir hasta el contenedor 'info'
const btnPremium = document.querySelector('.premium button');

let contenedorInfo = null;
if (btnPremium) {
  let nodo = btnPremium.parentElement;
  while (nodo && !nodo.classList.contains('info')) {
    nodo = nodo.parentElement;
  }
  contenedorInfo = nodo;
}

console.log(contenedorInfo);
