function generarInformeDeValidacion() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();

  const informe = document.getElementById('informe-errores');
  informe.innerHTML = '';

   let esValido = true;

  if (nombre.length <= 3) {
    const errorNombre = document.createElement('p');
    errorNombre.textContent = 'El nombre debe tener más de 3 caracteres.';
    informe.appendChild(errorNombre);
    esValido = false;
  }

  if (!email.includes('@')) {
    const errorEmail = document.createElement('p');
    errorEmail.textContent = 'El email debe contener un "@".';
    informe.appendChild(errorEmail);
    esValido = false;
  }

  if (esValido) {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'Formulario válido.';
    mensaje.classList.add('exito');
    informe.appendChild(mensaje);
  }
}
