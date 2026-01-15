function crearFecha(...args) {
  let fecha;

  if (args.length === 1) {
    fecha = new Date(args[0]);
  } else if (args.length === 3) {
    fecha = new Date(args[0], args[1] - 1, args[2]);
  }

  if (isNaN(fecha)) {
    throw new Error("Fecha inválida");
  }

  return fecha;
}

function iniciarContador(fechaEvento, elemento) {
  const intervalo = setInterval(() => {
    const ahora = Date.now();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
      elemento.textContent = "FINALIZADO";
      elemento.style.color = "red";
      clearInterval(intervalo);
      return;
    }

    const segundos = Math.floor(diferencia / 1000) % 60;
    const minutos = Math.floor(diferencia / (1000 * 60)) % 60;
    const horas = Math.floor(diferencia / (1000 * 60 * 60)) % 24;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    elemento.textContent =
      `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }, 1000);
}

const eventos = [
  { fecha: crearFecha(2026, 1, 15), id: "ev1" },
  { fecha: crearFecha("2026-03-02"), id: "ev2" },
  { fecha: crearFecha(1736035200000), id: "ev3" }
];

eventos.sort((a, b) => a.fecha - b.fecha);

eventos.forEach(ev => {
  const elemento = document.getElementById(ev.id);
  iniciarContador(ev.fecha, elemento);
});
