// 30. Limitar búsqueda al formulario y cambiar placeholder del textarea
const formulario30 = document.getElementById('formulario-contacto');

if (formulario30) {
  const textarea = formulario30.querySelector('textarea');
  if (textarea) {
    textarea.placeholder = 'Escribe aquí tu consulta detallada';
  }
}
