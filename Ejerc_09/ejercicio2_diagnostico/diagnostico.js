const spans = {
  viewport: document.getElementById('viewport'),
  total: document.getElementById('total'),
  pos: document.getElementById('pos'),
  res: document.getElementById('res'),
  avail: document.getElementById('avail'),
  estado: document.getElementById('estado'),
  indicador: document.getElementById('indicador')
};

function actualizar() {
  spans.viewport.textContent = `${window.innerWidth} x ${window.innerHeight}`;
  spans.total.textContent = `${window.outerWidth} x ${window.outerHeight}`;
  spans.pos.textContent = `${window.screenX}, ${window.screenY}`;
  spans.res.textContent = `${screen.width} x ${screen.height}`;
  spans.avail.textContent = `${screen.availWidth} x ${screen.availHeight}`;
  spans.estado.textContent = navigator.onLine ? 'Online' : 'Offline';
  spans.indicador.style.background = navigator.onLine ? 'green' : 'red';
}

actualizar();

window.addEventListener('resize', actualizar);
window.addEventListener('online', actualizar);
window.addEventListener('offline', actualizar);

let ultimaPos = { x: 0, y: 0 };
setInterval(() => {
  if (window.screenX !== ultimaPos.x || window.screenY !== ultimaPos.y) {
    ultimaPos = { x: window.screenX, y: window.screenY };
    actualizar();
  }
}, 250);
