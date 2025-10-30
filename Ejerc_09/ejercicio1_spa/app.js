const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};

const main = document.getElementById('contenido');

function cargarPagina(ruta) {
  const pagina = ruta.replace('/', '') || 'inicio';
  main.innerHTML = pages[pagina] || '<h1>404</h1><p>Página no encontrada.</p>';
}

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const ruta = e.target.getAttribute('href');
    history.pushState({ ruta }, '', ruta);
    cargarPagina(ruta);
  });
});

window.addEventListener('popstate', e => {
  if (e.state && e.state.ruta) cargarPagina(e.state.ruta);
});

cargarPagina(location.pathname);
