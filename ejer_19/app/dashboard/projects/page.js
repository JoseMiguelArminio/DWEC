import { cookies } from "next/headers";
import pool from "@/lib/db";
import { redirect } from "next/navigation";

async function createProject(formData) {

    "use server";

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const title = formData.get("title");
    const description = formData.get("description");
    const repo_url = formData.get("repo_url");
    const live_url = formData.get("live_url");

    await pool.query(
        "INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES (?, ?, ?, ?, ?)",
        [title, description, repo_url, live_url, user.id]
    );
}

async function deleteProject(formData) {

    "use server";

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const id = formData.get("id");

    await pool.query(
        "DELETE FROM projects WHERE id = ? AND user_id = ?",
        [id, user.id]
    );
}

export default async function ProjectsPage() {

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const [projects] = await pool.query(
        "SELECT * FROM projects WHERE user_id = ?",
        [user.id]
    );

    return (

        <main>

            <h1>Mis proyectos</h1>

            <form action={createProject}>

                <input name="title" placeholder="Título" />
                <input name="description" placeholder="Descripción" />
                <input name="repo_url" placeholder="GitHub" />
                <input name="live_url" placeholder="Demo" />

                <button type="submit">Crear proyecto</button>

            </form>

            <hr />

            {projects.map((p) => (

                <div key={p.id}>

                    <h3>{p.title}</h3>
                    <p>{p.description}</p>

                    <a href={p.repo_url}>Repo</a>
                    <a href={p.live_url}>Live</a>

                </div>

            ))}

        </main>
    );
}