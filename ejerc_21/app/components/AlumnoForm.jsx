"use client";

import { useState } from "react";

export default function AlumnoForm({ onCreated }) {

    const [file, setFile] = useState(null);

    async function handleSubmit(e) {

        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("imagen", file);

        await fetch("/api/alumnos", {
            method: "POST",
            body: formData
        });

        onCreated();
    }

    return (

        <form onSubmit={handleSubmit}>

            <input name="nombre" placeholder="Nombre" />
            <input name="apellidos" placeholder="Apellidos" />
            <input name="localidad" placeholder="Localidad" />

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button>Guardar</button>

        </form>
    );
}