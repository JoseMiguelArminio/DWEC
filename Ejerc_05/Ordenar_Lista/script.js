const botonOrdenar = document.getElementById('ordenar-btn');
const lista = document.getElementById('lista');

botonOrdenar.addEventListener('click', () => {

  const elementos = document.querySelectorAll('#lista li');

  const arrayElementos = Array.from(elementos);

  arrayElementos.sort((a, b) => a.textContent.localeCompare(b.textContent));

  lista.innerHTML = '';

  arrayElementos.forEach(li => lista.appendChild(li));
});
