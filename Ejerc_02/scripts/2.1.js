const numeros = [1, 2, 3, 4, 5, 6]

const dobles = numeros.map(num => num * 2)

const pares = numeros.filter(num => num % 2 === 0)

for (let num of pares) {
    console.log(num)
}

console.log('Números:', numeros)
console.log('Dobles:', dobles)
console.log('Pares:', pares)
