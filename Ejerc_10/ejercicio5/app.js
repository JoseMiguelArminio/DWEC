const baseEl = document.getElementById('base');
const mezclaEl = document.getElementById('mezcla');
const sintetizarBtn = document.getElementById('sintetizar');
const resultadoEl = document.getElementById('resultado');
const historialEl = document.getElementById('historial');

let recetasXml = null;
let recetas = []; 

fetch('recetas.xml')
.then(r => {
  if (!r.ok) throw new Error('recetas.xml no encontrado');
  return r.text();
})
.then(t => new DOMParser().parseFromString(t, 'application/xml'))
.then(x => {
  recetasXml = x;

  const nodes = [...x.querySelectorAll('aleacion')];
  const bases = new Set();
  const mezclas = new Set();

  nodes.forEach(n => {
    const b = n.querySelector('base').textContent;
    const m = n.querySelector('mezcla').textContent;
    const res = n.querySelector('resultado').textContent;
    const desc = n.querySelector('descripcion').textContent;

    recetas.push({ base: b, mezcla: m, resultado: res, descripcion: desc });
    bases.add(b); mezclas.add(m);
  });

  [...bases].forEach(b => {
    const o = document.createElement('option'); o.value = b; o.textContent = b; baseEl.appendChild(o);
  });
  [...mezclas].forEach(m => {
    const o = document.createElement('option'); o.value = m; o.textContent = m; mezclaEl.appendChild(o);
  });
})
.catch(e => resultadoEl.textContent = e.message);

sintetizarBtn.addEventListener('click', () => {
  const b = baseEl.value;
  const m = mezclaEl.value;
  const found = recetas.find(r => r.base === b && r.mezcla === m);
  if (found) {
    resultadoEl.innerHTML = `<div class="alert alert-success"><strong>${found.resultado}</strong><br>${found.descripcion}</div>`;

    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-action';
    li.textContent = `${b} + ${m} = ${found.resultado}`;
    li.dataset.base = b; li.dataset.mezcla = m;
    historialEl.prepend(li);
  } else {
    resultadoEl.innerHTML = `<div class="alert alert-warning">Combinación no válida. No se ha producido ninguna aleación.</div>`;
  }
});

historialEl.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const b = li.dataset.base; const m = li.dataset.mezcla;
  baseEl.value = b; mezclaEl.value = m;
  const found = recetas.find(r => r.base === b && r.mezcla === m);
  if (found) {
    resultadoEl.innerHTML = `<div class="alert alert-success"><strong>${found.resultado}</strong><br>${found.descripcion}</div>`;
  }
});
