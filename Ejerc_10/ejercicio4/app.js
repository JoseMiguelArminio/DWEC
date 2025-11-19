const textoEl = document.getElementById('texto');
const pistaEl = document.getElementById('pista');
const empezarBtn = document.getElementById('empezar');
const intentosEl = document.getElementById('intentos');
const alfabetoEl = document.getElementById('alfabeto');
const contenidoEl = document.getElementById('contenido');
const notas = document.getElementById('notas');

let currentSelector = null;
let requiredLetter = null;
let letterSelected = null;
let attemptCounter = 0;
let currentFragmentFile = null;

'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(ch => {
  const div = document.createElement('div');
  div.className = 'letra';
  div.textContent = ch;
  div.dataset.letra = ch;
  alfabetoEl.appendChild(div);
});

async function cargarFragmento(file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`No se pudo cargar ${file} (${res.status})`);
    const text = await res.text();
    const xml = new DOMParser().parseFromString(text, 'application/xml');
    const m = xml.querySelector('manuscrito');
    textoEl.textContent = m.querySelector('texto').textContent;
    pistaEl.textContent = m.querySelector('pista').textContent;
    currentSelector = m.querySelector('selector_solucion').textContent;
    requiredLetter = (m.querySelector('letra_clave') ? m.querySelector('letra_clave').textContent : null);
    currentFragmentFile = m.querySelector('siguiente_fragmento').textContent || null;
    notas.textContent = `Fragmento cargado: ${file}. Debéis seleccionar la letra: ${requiredLetter || '(sin letra)'}`;
  } catch (e) {
    notas.textContent = e.message;
  }
}

empezarBtn.addEventListener('click', () => {
  attemptCounter = 0; intentosEl.textContent = attemptCounter;
  cargarFragmento('fragmento1.xml');
});

alfabetoEl.addEventListener('click', e => {
  const l = e.target.closest('.letra');
  if (!l) return;
  [...alfabetoEl.children].forEach(n => n.classList.remove('selected'));
  l.classList.add('selected');
  letterSelected = l.dataset.letra;
  notas.textContent = `Letra seleccionada: ${letterSelected}`;
});

document.addEventListener('click', (e) => {
  if (e.target.closest('#alfabeto') || e.target.closest('#empezar')) return;

  if (!currentSelector) return;

  attemptCounter++;
  intentosEl.textContent = attemptCounter;

  const target = e.target;
  const okSelector = target.matches(currentSelector);
  const okLetter = requiredLetter ? (letterSelected === requiredLetter) : true;

  if (okSelector && okLetter) {
    notas.textContent = 'Acertaste. Cargando siguiente fragmento...';
    if (currentFragmentFile && currentFragmentFile !== 'null') {
      cargarFragmento(currentFragmentFile);
      [...alfabetoEl.children].forEach(n => n.classList.remove('selected'));
      letterSelected = null;
    } else {
      notas.textContent = '¡Habéis completado el manuscrito!';
    }
  } else {
    target.classList.add('resaltar-error');
    setTimeout(() => target.classList.remove('resaltar-error'), 400);
    notas.textContent = `Fallo. Selector correcto: ${currentSelector}. Letra requerida: ${requiredLetter || '(ninguna)'}`;
  }
});
