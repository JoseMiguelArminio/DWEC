const tituloEl = document.getElementById('titulo');
const fechaEl = document.getElementById('fecha');
const imgEl = document.getElementById('imagen');
const descEl = document.getElementById('descripcion');
const btnAnt = document.getElementById('anterior');
const btnSig = document.getElementById('siguiente');
const btnVolver = document.getElementById('volverUltimo');
const historialEl = document.getElementById('historial');
const notas = document.getElementById('notas');

let currentXml = null;
let currentFile = 'documento_ultimo.xml';

// utilidad carga xml con manejo 404
async function cargarXML(file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, 'application/xml');
    currentXml = xml;
    currentFile = file;
    renderDocument(xml, file);
  } catch (e) {
    notas.textContent = `No se pudo cargar ${file}: ${e.message}`;
    tituloEl.textContent = 'Documento no disponible';
    fechaEl.textContent = '';
    imgEl.src = '';
    descEl.textContent = '';
  }
}

function renderDocument(xml, file) {
  const doc = xml.querySelector('documento');
  const id = doc.querySelector('id').textContent;
  const titulo = doc.querySelector('titulo').textContent;
  const fecha = doc.querySelector('fecha').textContent;
  const imagen = doc.querySelector('imagen').textContent;
  const descripcion = doc.querySelector('descripcion').textContent;
  const siguiente = doc.querySelector('siguiente').textContent;
  const anterior = doc.querySelector('anterior').textContent;

  tituloEl.textContent = titulo;
  fechaEl.textContent = fecha;
  imgEl.src = imagen;
  imgEl.alt = titulo;
  descEl.textContent = descripcion;

  // botones
  btnSig.disabled = (siguiente === 'null');
  btnAnt.disabled = (anterior === 'null');

  btnSig.dataset.file = siguiente;
  btnAnt.dataset.file = anterior;

  notas.textContent = `Documento cargado: ${file}`;

  const key = `${titulo} — ${fecha}`;
  if (![...historialEl.children].some(li => li.dataset.key === key)) {
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action';
    li.textContent = `${titulo} — ${fecha}`;
    li.dataset.file = file;
    li.dataset.key = key;
    li.style.cursor = 'pointer';
    historialEl.prepend(li);
  }
}

btnSig.addEventListener('click', () => {
  const f = btnSig.dataset.file;
  if (f && f !== 'null') cargarXML(f);
});
btnAnt.addEventListener('click', () => {
  const f = btnAnt.dataset.file;
  if (f && f !== 'null') cargarXML(f);
});
btnVolver.addEventListener('click', () => cargarXML('documento_ultimo.xml'));

historialEl.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const f = li.dataset.file;
  if (f) cargarXML(f);
});

cargarXML('documento_ultimo.xml');
