const alumnos = [
    { nombre: "Jose Miguel", apellidos: "Arminio Garcia", calificacion: 7, aprobado: true },
    { nombre: "Pepa", apellidos: "Lopez Perez", calificacion: 5, aprobado: true },
    { nombre: "Manolo", apellidos: "Martinez Sanchez", calificacion: 4, aprobado: false }
]

const alumnosConId = alumnos.map((alumno, index) => {
    return { ...alumno, id: index + 1 }
})
console.log(alumnosConId)

const alumnosAprobados = alumnos.filter(alumno => alumno.aprobado)
console.log(alumnosAprobados)

alumnosAprobados.forEach(alumno => {
    console.log(`¡Felicidades ${alumno.nombre}, has aprobado con ${alumno.calificacion}!`)
})

alumnos.forEach(alumno => {
    const esCoherente = (alumno.calificacion >= 5 && alumno.aprobado) || (alumno.calificacion < 5 && !alumno.aprobado)
    if (!esCoherente) {
        console.log(`Incoherencia en el registro de ${alumno.nombre}: calificacion = ${alumno.calificacion}, aprobado = ${alumno.aprobado}`)
    }
})