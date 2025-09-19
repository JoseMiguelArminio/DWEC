
const usuario = {
    nombre: 'Manolo Gonzalez',
    email: ' manolitog@mail.com'
}
const perfil = {
    puesto: 'CEO',
    empresa: 'Manolon Solutions'
}
const empleado = { ...usuario, ...perfil }
console.log(empleado)

const ciudad = empleado?.perfil?.direccion?.ciudad ?? 'Ciudad no especificada'
console.log(ciudad)

