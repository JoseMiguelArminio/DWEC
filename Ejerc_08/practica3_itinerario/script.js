const destinoSel = document.getElementById("destino");
const tiposDiv = document.getElementById("tipos");
const precioMax = document.getElementById("precioMax");
const valorMax = document.getElementById("valorMax");
const actividadesDiv = document.getElementById("actividades");
const listaItinerario = document.getElementById("listaItinerario");
const totalSpan = document.getElementById("total");
const duracionSpan = document.getElementById("duracion");
const numActSpan = document.getElementById("numAct");
const erroresDiv = document.getElementById("errores");
const seguroContainer = document.getElementById("seguroContainer");
const seguro = document.getElementById("seguro");

let itinerario = [];

const destinos = ["Todos", ...new Set(actividades.map(a => a.destino))];
destinos.forEach(d => {
  const opt = document.createElement("option");
  opt.textContent = d;
  destinoSel.appendChild(opt);
});

const tipos = [...new Set(actividades.map(a => a.tipo))];
tipos.forEach(t => {
  tiposDiv.innerHTML += `<div><input type="checkbox" value="${t}"> ${t}</div>`;
});

function mostrarActividades(lista) {
  actividadesDiv.innerHTML = "";
  if (lista.length === 0) {
    actividadesDiv.innerHTML = "<p class='text-center'>No se encontraron actividades.</p>";
    return;
  }
  lista.forEach(a => {
    actividadesDiv.innerHTML += `
      <div class="col-md-6 mb-3">
        <div class="card p-2">
          <img src="${a.imagen}" class="card-img-top">
          <div class="card-body">
            <h5>${a.nombre}</h5>
            <p>${a.destino} - ${a.tipo}</p>
            <p><strong>${a.precio} €</strong> - ${a.duracionHoras}h</p>
            <button class="btn btn-success w-100" onclick="agregar(${a.id})">Añadir</button>
          </div>
        </div>
      </div>`;
  });
}

function filtrar() {
  valorMax.textContent = precioMax.value;
  const tiposSeleccionados = [...document.querySelectorAll('#tipos input:checked')].map(t => t.value);

  let lista = actividades.filter(a =>
    (destinoSel.value === "Todos" || a.destino === destinoSel.value) &&
    (tiposSeleccionados.length === 0 || tiposSeleccionados.includes(a.tipo)) &&
    a.precio <= precioMax.value
  );

  mostrarActividades(lista);
}

function actualizarItinerario() {
  listaItinerario.innerHTML = "";
  let total = 0, duracion = 0;

  itinerario.forEach(a => {
    total += a.precio;
    duracion += a.duracionHoras;
    listaItinerario.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${a.nombre} - ${a.precio} €
        <button class="btn btn-danger btn-sm" onclick="quitar(${a.id})">Quitar</button>
      </li>`;
  });

  totalSpan.textContent = total;
  duracionSpan.textContent = duracion;
  numActSpan.textContent = itinerario.length;

  if (total > 1000) {
    seguroContainer.classList.remove("d-none");
    seguro.required = true;
  } else {
    seguroContainer.classList.add("d-none");
    seguro.required = false;
    seguro.checked = false;
  }
}

function agregar(id) {
  const act = actividades.find(a => a.id === id);
  if (!itinerario.includes(act)) itinerario.push(act);
  actualizarItinerario();
}

function quitar(id) {
  itinerario = itinerario.filter(a => a.id !== id);
  actualizarItinerario();
}

document.getElementById("reservaForm").addEventListener("submit", e => {
  e.preventDefault();
  erroresDiv.innerHTML = "";
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const fecha = document.getElementById("fecha").value;
  const codigo = document.getElementById("codigo").value.trim();
  const hoy = new Date().toISOString().split("T")[0];

  let errores = [];

  if (itinerario.length === 0) errores.push("El itinerario no puede estar vacío.");
  if (nombre === "" || email === "" || fecha === "") errores.push("Todos los campos obligatorios deben completarse.");
  if (fecha < hoy) errores.push("La fecha no puede ser anterior a hoy.");
  if (seguro.required && !seguro.checked) errores.push("Debes marcar el seguro de viaje.");
  if (codigo && !/^[A-Za-z]{4}\d{2}$/.test(codigo)) errores.push("El código de descuento no es válido (formato: ABCD25).");

  if (errores.length > 0) {
    erroresDiv.innerHTML = errores.map(e => `<p>• ${e}</p>`).join("");
  } else {
    alert("✅ Reserva confirmada. ¡Buen viaje!");
    e.target.reset();
    itinerario = [];
    actualizarItinerario();
  }
});

[destinoSel, precioMax, ...document.querySelectorAll('#tipos input')]
  .forEach(el => el.addEventListener("input", filtrar));

filtrar();
