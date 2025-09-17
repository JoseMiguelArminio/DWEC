const ciudades = ["Madrid", "Buenos Aires", "Tokio", "Nueva York", "París"]  

ciudades.push("Roma")

const ciudadesMayusculas = ciudades.map(function(ciudad) {
    return ciudad.toUpperCase()
})

const ciudadesFiltradas = ciudades.filter(function(ciudad) {
    return ciudad.length > 6
})

console.log(ciudades)
console.log(ciudadesMayusculas)
console.log(ciudadesFiltradas)

