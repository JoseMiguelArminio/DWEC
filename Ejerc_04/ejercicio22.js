// 22. Evitar recarga en envío del formulario, capturar nombre y mensaje, y mostrarlos en consola
const formulario22 = document.getElementById('formulario-contacto');

if (formulario22) {
  formulario22.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = formulario22.querySelector('input[name="nombre"]').value;
    const mensaje = formulario22.querySelector('textarea[name="mensaje"]').value;

    console.log(`Nombre: ${nombre}`);
    console.log(`Mensaje: ${mensaje}`);
  });
}
