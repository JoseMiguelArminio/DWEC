const barra = document.getElementById('barra');
const boton = document.getElementById('arriba');

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scroll = window.scrollY;
  const porcentaje = (scroll / total) * 100;
  barra.value = porcentaje;

  if (scroll > window.innerHeight) {
    boton.classList.add('visible');
  } else {
    boton.classList.remove('visible');
  }
});

boton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
