// 21. Al pulsar el botón de la tarjeta premium, mostrar alerta con mensaje específico
const btnPremium21 = document.querySelector('.premium button');

if (btnPremium21) {
  btnPremium21.addEventListener('click', () => {
    alert('Accediendo a información exclusiva para miembros premium');
  });
}
