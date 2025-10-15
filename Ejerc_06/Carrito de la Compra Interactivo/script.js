let carrito = [];

const botones = document.querySelectorAll("#productos button");
const listaCarrito = document.getElementById("listaCarrito");
const totalSpan = document.getElementById("total");

botones.forEach(btn => {
  btn.addEventListener("click", () => {
    const productoDiv = btn.parentElement;
    const nombre = productoDiv.querySelector(".nombre").textContent;
    const precio = parseFloat(productoDiv.querySelector(".precio").textContent);

    const productoExistente = carrito.find(p => p.nombre === nombre);
    if(productoExistente){
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    renderizarCarrito();
  });
});

function renderizarCarrito(){
  listaCarrito.innerHTML = "";
  carrito.forEach(prod => {
    const li = document.createElement("li");
    li.textContent = `${prod.nombre} (x${prod.cantidad}) - ${prod.precio * prod.cantidad} €`;
    listaCarrito.appendChild(li);
  });
  calcularTotal();
}

function calcularTotal(){
  const total = carrito.reduce((sum, prod) => sum + prod.precio * prod.cantidad, 0);
  totalSpan.textContent = total.toFixed(2);
}
