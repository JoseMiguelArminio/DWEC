
fetch('soporte_vital.xml')
.then(r => {
    if (!r.ok) throw new Error("No se encontró soporte_vital.xml");
    return r.text();
})
.then(str => (new DOMParser()).parseFromString(str, "text/xml"))
.then(xml => {
    let medicion = xml.querySelector('medicion');
    document.getElementById("soporteVital").innerHTML = `
        Oxígeno: ${medicion.querySelector('oxigeno').textContent}%<br>
        Temperatura: ${medicion.querySelector('temperatura').textContent} °C<br>
        Presión: ${medicion.querySelector('presion').textContent} hPa
    `;
})
.catch(err => {
    document.getElementById("soporteVital").innerHTML = "⚠ Error cargando datos";
});

let xmlInventario;

fetch('inventario.xml')
.then(r => r.text())
.then(str => (new DOMParser()).parseFromString(str, "text/xml"))
.then(xml => {
    xmlInventario = xml;
    let items = xml.querySelectorAll('item');
    let select = document.getElementById("selectItems");
    items.forEach(i => {
        let op = document.createElement('option');
        op.value = i.getAttribute("id");
        op.textContent = i.querySelector('nombre').textContent;
        select.appendChild(op);
    });
});

document.getElementById("selectItems").addEventListener("change", () => {
    let id = document.getElementById("selectItems").value;
    let n = xmlInventario.querySelector(`item[id="${id}"]`);
    let cantidad = n.querySelector("cantidad").textContent;
    let unidad = n.getAttribute("unidad");
    document.getElementById("infoItem").textContent = `Disponible: ${cantidad} ${unidad}`;
});

document.getElementById("calcular").addEventListener("click", () => {
    let items = xmlInventario.querySelectorAll("item");
    let res = [];

    items.forEach(i => {
        let cant = parseFloat(i.querySelector("cantidad").textContent);
        let cons = parseFloat(i.querySelector("consumo").textContent);
        let dias = Math.floor(cant / (cons * 4));
        res.push(`${i.querySelector("nombre").textContent}: ${dias} días`);
    });

    document.getElementById("resultado").innerHTML =
        res.map(r => `<div>${r}</div>`).join('');
});
