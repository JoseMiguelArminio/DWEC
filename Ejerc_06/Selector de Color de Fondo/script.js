const contenedor = document.getElementById("contenedor");

contenedor.addEventListener("click", (event) => {
  if(event.target.classList.contains("color")){
    document.body.style.backgroundColor = event.target.style.backgroundColor;
  }
});
