// ------------------ Carrito con IndexedDB ------------------
function añadirCarritoIndexed(idProducto) {
    const tx = db.transaction('carrito', 'readwrite');
    const store = tx.objectStore('carrito');
    const get = store.get(idProducto);

    get.onsuccess = () => {
        const item = get.result;
        if (item) item.cantidad++;
        else store.add({ productoId: idProducto, cantidad: 1 });
        if (!item) store.add({ productoId: idProducto, cantidad: 1 });
        else store.put(item);
        mostrarCarritoIndexed();
    };
}

function mostrarCarritoIndexed() {
    const contenedor = document.getElementById('carrito');
    contenedor.innerHTML = '';
    const tx = db.transaction('carrito', 'readonly');
    const store = tx.objectStore('carrito');
    store.getAll().onsuccess = e => {
        const carrito = e.target.result;
        carrito.forEach(p => {
            contenedor.innerHTML += `
                <div>${p.productoId} - ${p.cantidad} 
                    <button onclick="modificar('+','${p.productoId}')">+</button>
                    <button onclick="modificar('-','${p.productoId}')">-</button>
                    <button onclick="eliminar('${p.productoId}')">x</button>
                </div>
            `;
        });
    };
}

function modificar(tipo, id) {
    const tx = db.transaction('carrito', 'readwrite');
    const store = tx.objectStore('carrito');
    const get = store.get(id);
    get.onsuccess = () => {
        const item = get.result;
        if (tipo === '+') item.cantidad++;
        else if (tipo === '-') item.cantidad = Math.max(item.cantidad - 1, 1);
        store.put(item);
        mostrarCarritoIndexed();
    };
}

function eliminar(id) {
    const tx = db.transaction('carrito', 'readwrite');
    tx.objectStore('carrito').delete(id).oncomplete = mostrarCarritoIndexed;
}

document.getElementById('vaciarCarrito').onclick = () => {
    const tx = db.transaction('carrito', 'readwrite');
    tx.objectStore('carrito').clear().oncomplete = mostrarCarritoIndexed;
};
