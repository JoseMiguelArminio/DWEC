document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');

    // --- Ejercicio 1 y 4 ---
    const outerBox = document.getElementById('outer-box');
    const middleBox = document.getElementById('middle-box');
    const innerBox = document.getElementById('inner-box');

    outerBox.addEventListener('click', (event) => {
        event.target.classList.add('highlight');
        console.log(`Elemento pulsado: ${event.target.id}`);
        console.log(`Elemento que gestiona el evento: ${event.currentTarget.id}`);
    });
    
    middleBox.addEventListener('click', (event) => {
        event.stopPropagation();
        middleBox.classList.add('highlight');
        console.log('Propagación detenida en middle-box');
    });

    // --- Ejercicio 2 ---
    const link = document.getElementById('test-link');
    link.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Navegación prevenida');
    });

    // --- Ejercicio 3 ---
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 250) {
            backToTopBtn.classList.remove('hidden');
        } else {
            backToTopBtn.classList.add('hidden');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Ejercicio 5 ---
    const notificationBtn = document.getElementById('notification-btn');
    const notificationArea = document.getElementById('notification-area');

    document.body.addEventListener('notification', (event) => {
        const { message, date } = event.detail;
        notificationArea.innerHTML = `<p><strong>${message}</strong><br>${date}</p>`;
    });

    notificationBtn.addEventListener('click', () => {
        const customEvent = new CustomEvent('notification', {
            detail: {
                message: '¡Has lanzado una notificación personalizada!',
                date: new Date().toLocaleString()
            }
        });
        document.body.dispatchEvent(customEvent);
    });
});

