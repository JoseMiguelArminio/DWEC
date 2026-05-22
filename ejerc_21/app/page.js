import pool from "@/lib/db";
import AlumnoForm from "@/app/components/AlumnoForm";
import AlumnoList from "@/app/components/AlumnoList";

async function getAlumnos() {

    const [rows] = await pool.query("SELECT * FROM alumno");
    return rows;
}

export default async function Home() {

    const alumnos = await getAlumnos();

    return (
        <main>

            <h1>Gestión de Alumnos</h1>

            <AlumnoForm />

            <AlumnoList alumnos={alumnos} />

        </main>
    );
}