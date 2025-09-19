
function calcularAreaRectangulo(base = 1, altura = 1) {
    return base * altura
}
console.log('Area del rectángulo:', calcularAreaRectangulo(5, 10))

const calcularAreaTriangulo = function(base = 1, altura = 1) {
    return (base * altura) / 2
}
console.log('Area del triángulo:', calcularAreaTriangulo(5, 10))

const calcularAreaCirculo = (radio = 1) => Math.PI * radio * radio
console.log('Area del círculo:', calcularAreaCirculo(5))
