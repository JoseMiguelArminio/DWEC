const lista = document.getElementById("lista");

function actualizarBotones(){
  const items = lista.querySelectorAll("li");
  items.forEach((li, i) => {
    li.querySelector(".subir").disabled = i === 0;
    li.querySelector(".bajar").disabled = i === items.length - 1;
  });
}
actualizarBotones();

lista.addEventListener("click", e => {
  const boton = e.target;
  if(boton.tagName === "BUTTON"){
    const li = boton.closest("li");
    if(boton.classList.contains("subir") && li.previousElementSibling){
      lista.insertBefore(li, li.previousElementSibling);
    } else if(boton.classList.contains("bajar") && li.nextElementSibling){
      lista.insertBefore(li.nextElementSibling, li);
    }
    actualizarBotones();
  }
});
