async function cargarLogs() {
  try {
    const respuesta = await fetch("logs.txt");
    if (!respuesta.ok) throw new Error("No se pudo cargar el archivo");

    const texto = await respuesta.text();
    procesarLogs(texto);
  } catch (error) {
    console.error(error.message);
  }
}

function procesarLogs(texto) {
  const lineas = texto.split("\n");
  const tbody = document.querySelector("tbody");
  let consumoTotal = 0;

  lineas.forEach(linea => {
    linea = linea.trim();
    if (linea === "") return;

    const idParte = linea.slice(linea.indexOf("ID:") + 3);
    const idSesion = idParte.slice(idParte.indexOf("-") + 1, idParte.indexOf(" |"));

    const usuario = linea
      .slice(linea.indexOf("USER:") + 5, linea.indexOf("| BYTES"))
      .trim()
      .toLowerCase();

    const esError = linea.includes("ERROR");

    const bytesStr = linea
      .slice(linea.indexOf("BYTES:") + 6, linea.indexOf("| STATUS"))
      .trim();

    const bytes = Number(bytesStr);
    const consumoMB = bytes / (1024 * 1024);
    const consumoFinal = Number(consumoMB.toFixed(2));

    consumoTotal += consumoFinal;

    crearFila(tbody, idSesion, usuario, consumoFinal, esError);
  });

  document.getElementById("total").textContent =
    consumoTotal.toFixed(2) + " MB";
}

function crearFila(tbody, id, usuario, consumo, error) {
  const tr = document.createElement("tr");
  if (error) tr.classList.add("error");

  tr.innerHTML = `
    <td>#${id}</td>
    <td>${usuario}</td>
    <td>${consumo} MB</td>
    <td>
      <span class="${error ? "badge-error" : "badge-ok"}">
        ${error ? "ERROR" : "OK"}
      </span>
    </td>
  `;

  tbody.appendChild(tr);
}

window.addEventListener("DOMContentLoaded", cargarLogs);
