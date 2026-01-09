// ------------------ Ejercicio 1: Tema ------------------
function aplicarTema(tema) {
    if (tema === 'claro') {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    } else {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }
    sessionStorage.setItem('tema', tema);
}

const temaGuardado = sessionStorage.getItem('tema');
if (temaGuardado) aplicarTema(temaGuardado);

document.getElementById('temaClaro').onclick = () => aplicarTema('claro');
document.getElementById('temaOscuro').onclick = () => aplicarTema('oscuro');

// ------------------ Ejercicio 4: IndexedDB Productos ------------------
let db;
const request = indexedDB.open('tiendaDB', 1);

request.onupgradeneeded = e => {
    db = e.target.result;
    if (!db.objectStoreNames.contains('productos')) {
        db.createObjectStore('productos', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('carrito')) {
        db.createObjectStore('carrito', { keyPath: 'productoId' });
    }
};

request.onsuccess = e => {
    db = e.target.result;
    cargarProductos();
};

function cargarProductos() {
    const tx = db.transaction('productos', 'readonly');
    const store = tx.objectStore('productos');
    const getAll = store.getAll();

    getAll.onsuccess = () => {
        if (getAll.result.length) mostrarProductos(getAll.result);
        else {
            fetch('productos.json')
                .then(r => r.json())
                .then(data => {
                    const tx2 = db.transaction('productos', 'readwrite');
                    const store2 = tx2.objectStore('productos');
                    data.forEach(p => store2.add(p));
                    tx2.oncomplete = () => mostrarProductos(data);
                });
        }
    };
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
    productos.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${p.imagen}" alt="${p.nombre}" width="100">
                <h4>${p.nombre}</h4>
                <p>Precio: ${p.precio}€</p>
                <button onclick="añadirCarritoIndexed('${p.id}')">Añadir al carrito</button>
            </div>
        `;
    });
}

document.getElementById('actualizarCatalogo').onclick = () => {
    const tx = db.transaction('productos', 'readwrite');
    tx.objectStore('productos').clear().oncomplete = cargarProductos;
};
