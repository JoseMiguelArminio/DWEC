const input = document.getElementById('tarea-input');
const botonAnadir = document.getElementById('btn-anadir');
const lista = document.getElementById('lista-tareas');

botonAnadir.addEventListener('click', () => {
  const textoTarea = input.value.trim();

  if (textoTarea !== '') {

    const li = document.createElement('li');
    li.textContent = textoTarea;

   const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('eliminar');

    li.appendChild(botonEliminar);

    lista.appendChild(li);

    input.value = '';
  }
});

lista.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('eliminar')) {
    const li = evento.target.parentNode;
    li.remove();
  }
});
