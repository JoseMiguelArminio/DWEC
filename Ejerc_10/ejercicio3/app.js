const codigoEl = document.getElementById('codigo');
const claveEl = document.getElementById('clave');
const nombreAgenteEl = document.getElementById('nombreAgente');
const estadoClaveEl = document.getElementById('estadoClave');
const botonAcceder = document.getElementById('acceder');
const notas = document.getElementById('notas');

let personalXml = null;
let agenteValido = null;
let claveValida = false;

// cargar personal.xml al inicio (guardar en memoria)
fetch('personal.xml')
.then(r => {
  if (!r.ok) throw new Error('personal.xml no encontrado');
  return r.text();
})
.then(t => new DOMParser().parseFromString(t, 'application/xml'))
.then(x => personalXml = x)
.catch(e => notas.textContent = e.message);

// al salir del campo codigo
codigoEl.addEventListener('blur', () => {
  const codigo = codigoEl.value.trim();
  agenteValido = null;
  claveValida = false;
  estadoClaveEl.textContent = '';
  claveEl.value = '';
  claveEl.disabled = true;
  botonAcceder.disabled = true;

  if (!personalXml) {
    nombreAgenteEl.textContent = 'Datos de personal no disponibles.';
    return;
  }

  if (codigo === '') {
    nombreAgenteEl.textContent = '';
    return;
  }

  const agente = personalXml.querySelector(`agente[codigo="${codigo}"]`);
  if (agente) {
    agenteValido = agente;
    const nombre = agente.querySelector('nombre').textContent;
    nombreAgenteEl.textContent = `Bienvenido, ${nombre}`;
    claveEl.disabled = false;
    // no habilitar botón aún hasta comprobar clave
  } else {
    nombreAgenteEl.textContent = 'Código de agente no reconocido';
    claveEl.disabled = true;
  }
});

codigoEl.addEventListener('input', () => {
  agenteValido = null;
  claveValida = false;
  nombreAgenteEl.textContent = '';
  estadoClaveEl.textContent = '';
  claveEl.value = '';
  claveEl.disabled = true;
  botonAcceder.disabled = true;
});

claveEl.addEventListener('blur', () => {
  if (!agenteValido) {
    estadoClaveEl.textContent = 'Introduce un código de agente válido primero.';
    return;
  }
  const claveIntroducida = claveEl.value;
  const claveReal = agenteValido.querySelector('clave').textContent;
  if (claveIntroducida === claveReal) {
    estadoClaveEl.textContent = 'Clave correcta';
    claveValida = true;
    botonAcceder.disabled = false;
  } else {
    estadoClaveEl.textContent = 'Clave incorrecta';
    claveValida = false;
    botonAcceder.disabled = true;
  }
});

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (agenteValido && claveValida) {
    notas.textContent = `Acceso concedido para ${agenteValido.querySelector('nombre').textContent}.`;
  } else {
    notas.textContent = 'Acceso denegado.';
  }
});
