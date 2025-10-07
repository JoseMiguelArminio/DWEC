// 25. Aplicar fondo #f0f0f0 a tarjetas con categoría ‘Desarrollo Web’
const tarjetasCursos = document.querySelectorAll('.curso');

tarjetasCursos.forEach(tarjeta => {
  const categoria = tarjeta.querySelector('.categoria');
  if (categoria && categoria.textContent.trim() === 'Desarrollo Web') {
    tarjeta.style.backgroundColor = '#f0f0f0';
  }
});
