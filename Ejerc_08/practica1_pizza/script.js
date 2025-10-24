function actualizarPrecio() {
  let total = 0;

  const tamanos = document.querySelectorAll('input[name="tamano"]');
  tamanos.forEach(t => { if (t.checked) total += parseFloat(t.value); });

  total += parseFloat(document.getElementById("masa").value);

  document.querySelectorAll('input[type="checkbox"]').forEach(chk => {
    if (chk.checked) total += parseFloat(chk.value);
  });

  document.getElementById("precioTotal").textContent = `Precio Total: ${total.toFixed(2)} €`;
}

document.querySelectorAll('input, select').forEach(el => {
  el.addEventListener('change', actualizarPrecio);
});

document.getElementById("pedidoBtn").addEventListener("click", () => {
  let tamaño = document.querySelector('input[name="tamano"]:checked').nextSibling.textContent.trim();
  let masa = document.getElementById("masa").selectedOptions[0].text;
  let extras = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(chk => chk.nextSibling.textContent.trim());
  let total = document.getElementById("precioTotal").textContent;

  alert(`Pedido:\n${tamaño}\nMasa: ${masa}\nExtras: ${extras.join(", ") || "Ninguno"}\n${total}`);
});

actualizarPrecio();
