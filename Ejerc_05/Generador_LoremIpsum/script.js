const inputCantidad = document.getElementById('cantidad');
const botonGenerar = document.getElementById('generar');
const divResultado = document.getElementById('resultado');

const textoLorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel velit sit amet risus laoreet fermentum. Integer pretium, turpis id efficitur bibendum, erat justo facilisis est, ut malesuada nulla est sit amet mi.";

botonGenerar.addEventListener('click', () => {
  const cantidad = parseInt(inputCantidad.value);

  divResultado.innerHTML = '';

  if (isNaN(cantidad) || cantidad < 1) {
    divResultado.textContent = "Introduce un número válido.";
    return;
  }

  const fragmento = document.createDocumentFragment();

  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement('p');
    p.textContent = textoLorem;
    fragmento.appendChild(p);
  }

  divResultado.appendChild(fragmento);
});
