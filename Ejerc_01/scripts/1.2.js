const coche = {
    marca: "Audi",
    modelo: "A2",
    año: 2007,
    disponibilidad: false
}
console.table(coche)

const { marca, modelo } = coche
console.log(marca)
console.log(modelo)

disponibilidad = true
console.log(coche)

coche.color = "Negro"
console.log(coche)

delete coche.año
console.log(coche)

console.table(coche)
