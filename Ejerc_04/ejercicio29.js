// 29. Añadir atributo data-tipo="enlace-nav" a todos los enlaces de navegación
const enlacesNav29 = document.querySelectorAll('nav a');

enlacesNav29.forEach(enlace => {
  enlace.setAttribute('data-tipo', 'enlace-nav');
});
