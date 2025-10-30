let popupWindow;

function abrirPopup() {
  if (!popupWindow || popupWindow.closed) {
    const left = (screen.width - 400) / 2;
    popupWindow = window.open('popup.html', 'popup', `width=400,height=300,left=${left},top=100`);
  } else {
    popupWindow.focus();
  }
}

function cerrarPopup() {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
}

document.getElementById('abrir').addEventListener('click', abrirPopup);
document.getElementById('cerrar').addEventListener('click', cerrarPopup);

setTimeout(abrirPopup, 5000);
