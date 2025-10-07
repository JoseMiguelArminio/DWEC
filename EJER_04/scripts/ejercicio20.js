// 20. Desde el segundo enlace del menú, llegar al <h1> principal y cambiar su color a naranja
const segundoEnlaceMenu = document.querySelector('nav a:nth-child(2)');

if (segundoEnlaceMenu) {
  const header = segundoEnlaceMenu.closest('header');
  const tituloH1 = header ? header.querySelector('h1') : document.querySelector('h1');
  
  if (tituloH1) {
    tituloH1.style.color = 'orange';
  }
}
