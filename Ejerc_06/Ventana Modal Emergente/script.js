const btnMostrar = document.getElementById("mostrar");
const btnCerrar = document.getElementById("cerrar");
const modal = document.getElementById("miModal");

btnMostrar.addEventListener("click", () => modal.style.display = "block");
btnCerrar.addEventListener("click", () => modal.style.display = "none");
