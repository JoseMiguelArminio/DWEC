const usuarios = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Luis', edad: 30 },
  { nombre: 'María', edad: 28 },
  { nombre: 'Carlos', edad: 35 }
];

function construirTabla(datos) {
  const fragmento = document.createDocumentFragment();

  const tabla = document.createElement('table');

  const encabezado = document.createElement('tr');
  const thNombre = document.createElement('th');
  thNombre.textContent = 'Nombre';
  const thEdad = document.createElement('th');
  thEdad.textContent = 'Edad';
  encabezado.appendChild(thNombre);
  encabezado.appendChild(thEdad);
  tabla.appendChild(encabezado);

  datos.forEach(usuario => {
    const fila = document.createElement('tr');

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = usuario.nombre;

    const celdaEdad = document.createElement('td');
    celdaEdad.textContent = usuario.edad;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaEdad);

    tabla.appendChild(fila);
  });

  fragmento.appendChild(tabla);

  const contenedor = document.getElementById('contenedor-tabla');
  contenedor.appendChild(fragmento);
}

construirTabla(usuarios);
