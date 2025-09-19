
import { crearPerfil as crear } from './gestorUsuarios.js'
import mostrarPerfil from './gestorUsuarios.js'
const usuarios = [
    crear('Manolo Gonzalez', 'manolitog@mail.com', 30),
    crear('Juan Jose Menendez', 'juanjom@mail.com', 25)
]
usuarios.forEach(usuario => {
    console.log(mostrarPerfil(usuario))
})
import { obtenerMayoresDeEdad, calcularPromedioEdad } from './gestorUsuarios.js'

const usuarios2 = [
    crear('Eustaquio Perez', 'estustap@mail.com', 17),
    crear('Pepe Lopez', 'pepel@mail.com', 15),
    crear('Ana Garcia', 'anag@mail.com', 22),
    crear('Marta Sanchez', 'martas@mail.com', 19),
    crear('Luis Fernandez', 'luisf@mail.com', 16)
]
const mayoresDeEdad = obtenerMayoresDeEdad(usuarios2)
console.log('Usuarios mayores de edad:')
mayoresDeEdad.forEach(usuario => {
    console.log(mostrarPerfil(usuario))
})
const promedioEdad = calcularPromedioEdad(usuarios2)
console.log(`La edad promedio de los usuarios es: ${promedioEdad}`)
