function obtenerCookie(nombre) {
    const cookies = document.cookie.split('; ');
    for (let c of cookies) {
        const [key, valor] = c.split('=');
        if (key === nombre) return valor;
    }
    return null;
}

const ultimaVisita = obtenerCookie('ultimaVisita');
if (ultimaVisita) {
    const banner = document.createElement('div');
    banner.innerHTML = `Bienvenido de nuevo. Tu última visita fue el ${ultimaVisita} 
                        <button id="cerrarBanner">Cerrar</button>`;
    banner.style.backgroundColor = 'yellow';
    banner.style.padding = '10px';
    document.getElementById('banner').appendChild(banner);

    document.getElementById('cerrarBanner').onclick = () => banner.remove();
}

const fechaActual = new Date().toLocaleString();
document.cookie = `ultimaVisita=${fechaActual}; max-age=${60*60*24*30}; path=/`;
