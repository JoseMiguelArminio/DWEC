const ciudades = [
  { nombre: 'Madrid', pais: 'España' },
  { nombre: 'Barcelona', pais: 'España' },
  { nombre: 'Londres', pais: 'Reino Unido' },
  { nombre: 'París', pais: 'Francia' },
  { nombre: 'Berlín', pais: 'Alemania' },
  { nombre: 'Roma', pais: 'Italia' },
  { nombre: 'Lisboa', pais: 'Portugal' }
];

const lista = document.getElementById('lista-ciudades');
const boton = document.getElementById('filtrar-btn');
const input = document.getElementById('input-pais');

ciudades.forEach(ciudad => {
  const li = document.createElement('li');
  li.textContent = `${ciudad.nombre} - ${ciudad.pais}`;
  lista.appendChild(li);
});

function filtrarPorPais(paisBuscado) {
  const elementos = document.querySelectorAll('#lista-ciudades li');
  elementos.forEach(li => {
    if (li.textContent.toLowerCase().includes(paisBuscado.toLowerCase())) {
      li.style.display = 'list-item';
    } else {
      li.style.display = 'none';
    }
  });
}

boton.addEventListener('click', () => {
  const pais = input.value.trim();
  filtrarPorPais(pais);
});
