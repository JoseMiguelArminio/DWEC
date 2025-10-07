// 12. Actualizar el enlace de contacto con el número total de cursos
const cursos12 = document.querySelectorAll('.curso');
const enlaceContacto = document.querySelector('nav a[href="#contacto"]'); // Asumiendo que el enlace apunta a #contacto

if (enlaceContacto) {
  enlaceContacto.textContent = `Contacto (${cursos12.length} Cursos)`;
}
