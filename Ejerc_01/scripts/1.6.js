
const cursos = [
    {
        nombre: "JavaScript",
        profesor: "Pablo",
        estudiantes: [
            { nombre: "Ana", calificacion: 8 },
            { nombre: "Luis", calificacion: 6 },
            { nombre: "Marta", calificacion: 9 }
        ]
    },
    {
        nombre: "Python",
        profesor: "Pepe",
        estudiantes: [
            { nombre: "Carlos", calificacion: 7 },
            { nombre: "Sofia", calificacion: 10 },
            { nombre: "Diego", calificacion: 5 }
        ]
    },
    {
        nombre: "Java",
        profesor: "Manolo",
        estudiantes: [
            { nombre: "Lucia", calificacion: 6 },
            { nombre: "Javier", calificacion: 4 },
            { nombre: "Elena", calificacion: 8 }
        ]
    },
    {
        nombre: "C++",
        profesor: "Eustaquio",
        estudiantes: [
            { nombre: "Alvaro", calificacion: 9 },
            { nombre: "Nuria", calificacion: 7 },
            { nombre: "Raul", calificacion: 6 }
        ]
    }
]
console.log(cursos)

const resumenCursos = cursos.map(curso => {
    const totalCalificaciones = curso.estudiantes.reduce((total, estudiante) => total + estudiante.calificacion, 0)
    const promedioCalificaciones = totalCalificaciones / curso.estudiantes.length
    return {
        nombreCurso: curso.nombre,
        promedioCalificaciones: promedioCalificaciones
    }
}
)
console.log(resumenCursos)