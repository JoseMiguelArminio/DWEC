import pool from "@/lib/db";
import { cookies } from "next/headers";

export default async function PortfolioPage({ params }) {

    const username = params.username;

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    let currentUser = null;

    if (userCookie) {
        currentUser = JSON.parse(userCookie.value);
    }

    const [users] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );

    if (users.length === 0) {
        return <p>Usuario no encontrado</p>;
    }

    const user = users[0];

    const [projects] = await pool.query(
        "SELECT * FROM projects WHERE user_id = ?",
        [user.id]
    );

    const [socials] = await pool.query(
        "SELECT * FROM social_links WHERE user_id = ?",
        [user.id]
    );

    const isOwner = currentUser && currentUser.id === user.id;

    return (

        <main>

            <h1>Portfolio de {user.username}</h1>

            <p>{user.bio || "Sin biografía"}</p>

            <p>{user.email}</p>

            <hr />

            <h2>Proyectos</h2>

            {projects.map((p) => (

                <div key={p.id}>

                    <h3>{p.title}</h3>
                    <p>{p.description}</p>

                    <a href={p.repo_url}>Repo</a>
                    <a href={p.live_url}>Live</a>

                </div>

            ))}

            <hr />

            <h2>Redes sociales</h2>

            {socials.map((s) => (

                <div key={s.id}>

                    <p>{s.platform}</p>
                    <a href={s.url}>{s.url}</a>

                </div>

            ))}

            {isOwner && (

                <div>

                    <hr />

                    <a href="/dashboard">Gestionar mi portfolio</a>

                </div>

            )}

        </main>
    );
}