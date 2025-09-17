const producto = {
    nombre: "Cascos",
    precio: 50
}
console.log(producto)

const cliente = {
    nombreCliente: "Manolo",
    esPremium: false
}
console.log(cliente)

const pedido = { ...producto, ...cliente }
console.log(pedido)

const producto2 = {
    nombre: "Cascos"
}
console.log(producto2)

const pedido2 = {...producto2, ...cliente }
console.log(pedido2)
