import pool from "@/lib/db";
import crypto from "crypto";
import { redirect } from "next/navigation";

async function registerUser(formData) {

    "use server";

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
        throw new Error("Todos los campos son obligatorios");
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    await pool.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
    );

    redirect("/login");
}

export default function RegisterPage() {

    return (

        <main>

            <h1>Registro</h1>

            <form action={registerUser}>

                <input name="username" placeholder="Usuario" />
                <input name="email" placeholder="Email" />
                <input name="password" type="password" placeholder="Contraseña" />

                <button type="submit">Registrarse</button>

            </form>

        </main>
    );
}