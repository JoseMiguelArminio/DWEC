const lista = document.getElementById("productos");
const buscar = document.getElementById("buscar");
const categoria = document.getElementById("categoria");
const precio = document.getElementById("precio");
const valorPrecio = document.getElementById("valorPrecio");

// Rellenar categorías
const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))];
categorias.forEach(cat => {
  const opt = document.createElement("option");
  opt.textContent = cat;
  categoria.appendChild(opt);
});

function mostrarProductos(listaFiltrada) {
  lista.innerHTML = "";
  if (listaFiltrada.length === 0) {
    lista.innerHTML = "<p class='text-center'>No se encontraron productos.</p>";
    return;
  }
  listaFiltrada.forEach(p => {
    lista.innerHTML += `
      <div class="col-md-3 mb-3">
        <div class="card p-2">
          <img src="${p.imagen}" class="card-img-top">
          <div class="card-body">
            <h5>${p.nombre}</h5>
            <p>${p.categoria}</p>
            <p><strong>${p.precio} €</strong></p>
          </div>
        </div>
      </div>`;
  });
}

function filtrar() {
  valorPrecio.textContent = precio.value;
  let listaFiltrada = productos.filter(p => 
    p.nombre.toLowerCase().includes(buscar.value.toLowerCase()) &&
    (categoria.value === "Todas" || p.categoria === categoria.value) &&
    p.precio <= precio.value
  );

  const orden = document.querySelector('input[name="orden"]:checked').value;
  if (orden === "asc") listaFiltrada.sort((a,b) => a.precio - b.precio);
  else if (orden === "desc") listaFiltrada.sort((a,b) => b.precio - a.precio);
  else listaFiltrada.sort((a,b) => a.nombre.localeCompare(b.nombre));

  mostrarProductos(listaFiltrada);
}

[buscar, categoria, precio, ...document.querySelectorAll('input[name="orden"]')]
  .forEach(el => el.addEventListener("input", filtrar));

filtrar();
