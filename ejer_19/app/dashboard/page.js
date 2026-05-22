import { cookies } from "next/headers";
import pool from "@/lib/db";
import { redirect } from "next/navigation";

async function updateProfile(formData) {

    "use server";

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const email = formData.get("email");
    const bio = formData.get("bio");

    await pool.query(
        "UPDATE users SET email = ?, bio = ? WHERE id = ?",
        [email, bio, user.id]
    );
}

export default async function DashboardPage() {

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [user.id]
    );

    const currentUser = rows[0];

    return (

        <main>

            <h1>Dashboard</h1>

            <p>Bienvenido, {currentUser.username}</p>

            <p>Email actual: {currentUser.email}</p>

            <p>Bio actual: {currentUser.bio || "Sin bio"}</p>

            <hr />

            <h2>Editar perfil</h2>

            <form action={updateProfile}>

                <input
                    name="email"
                    defaultValue={currentUser.email}
                    placeholder="Email"
                />

                <textarea
                    name="bio"
                    defaultValue={currentUser.bio}
                    placeholder="Bio"
                />

                <button type="submit">Actualizar perfil</button>

            </form>

        </main>
    );
}