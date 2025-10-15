const tabla = document.getElementById("tabla");

tabla.addEventListener("dblclick", (event) => {
  const td = event.target;
  if(td.tagName === "TD" && !td.querySelector("input")){
    const valor = td.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = valor;
    td.textContent = "";
    td.appendChild(input);
    input.focus();

    input.addEventListener("blur", () => td.textContent = input.value);
  }
});
