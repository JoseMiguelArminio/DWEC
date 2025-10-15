const cuadricula = document.getElementById("cuadricula");
let isDrawing = false;

for(let i = 0; i < 1600; i++){
  const celda = document.createElement("div");
  celda.classList.add("celda");
  cuadricula.appendChild(celda);
}

cuadricula.addEventListener("mousedown", () => isDrawing = true);
document.addEventListener("mouseup", () => isDrawing = false);

cuadricula.addEventListener("mouseover", e => {
  if(isDrawing && e.target.classList.contains("celda")){
    e.target.style.backgroundColor = "black";
  }
});
