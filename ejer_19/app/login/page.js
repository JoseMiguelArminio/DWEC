import pool from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function loginUser(formData) {

    "use server";

    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
        throw new Error("Todos los campos son obligatorios");
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, hashedPassword]
    );

    if (rows.length === 0) {
        throw new Error("Credenciales incorrectas");
    }

    const user = rows[0];

    cookies().set("user", JSON.stringify({
        id: user.id,
        username: user.username
    }), {
        httpOnly: true,
        path: "/"
    });

    redirect("/dashboard");
}

export default function LoginPage() {

    return (

        <main>

            <h1>Login</h1>

            <form action={loginUser}>

                <input name="username" placeholder="Usuario" />
                <input name="password" type="password" placeholder="Contraseña" />

                <button type="submit">Entrar</button>

            </form>

        </main>
    );
}