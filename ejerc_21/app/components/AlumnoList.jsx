"use client";

export default function AlumnoList({ alumnos, onDelete }) {

    async function handleDelete(id) {

        await fetch(`/api/alumnos/${id}`, {
            method: "DELETE"
        });

        onDelete();
    }

    return (

        <div>

            {alumnos.map((a) => (

                <div key={a.id}>

                    <p>{a.nombre} {a.apellidos}</p>
                    <p>{a.localidad}</p>

                    <img
                        src={`${process.env.NEXT_PUBLIC_S3_URL}/${a.imagen}`}
                        width="100"
                    />

                    <button onClick={() => handleDelete(a.id)}>
                        Borrar
                    </button>

                </div>

            ))}

        </div>
    );
}