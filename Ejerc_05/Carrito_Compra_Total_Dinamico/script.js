const listaProductos = document.getElementById('lista-productos');
const carrito = document.getElementById('carrito');
const totalSpan = document.getElementById('total');

listaProductos.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('anadir')) {
    const producto = evento.target.parentNode;

    const clon = producto.cloneNode(true);

    const boton = clon.querySelector('button');
    boton.textContent = 'Quitar';
    boton.classList.remove('anadir');
    boton.classList.add('quitar');

    carrito.appendChild(clon);

    calcularTotal();
  }
});

carrito.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('quitar')) {

    evento.target.parentNode.remove();

    calcularTotal();
  }
});

function calcularTotal() {
  let total = 0;
  const productosEnCarrito = carrito.querySelectorAll('li');

  productosEnCarrito.forEach(item => {
    const precio = parseFloat(item.getAttribute('data-price'));
    total += precio;
  });

  totalSpan.textContent = total.toFixed(2);
}
