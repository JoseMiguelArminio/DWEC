const input = document.getElementById("buscar");
const lista = document.getElementById("lista").getElementsByTagName("li");

input.addEventListener("input", () => {
  const texto = input.value.toLowerCase();
  for(let i = 0; i < lista.length; i++){
    const pais = lista[i].textContent.toLowerCase();
    lista[i].style.display = pais.includes(texto) ? "list-item" : "none";
  }
});
