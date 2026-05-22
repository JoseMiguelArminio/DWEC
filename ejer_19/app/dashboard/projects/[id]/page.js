import pool from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function updateProject(formData) {

    "use server";

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const repo_url = formData.get("repo_url");
    const live_url = formData.get("live_url");

    await pool.query(
        `UPDATE projects 
         SET title = ?, description = ?, repo_url = ?, live_url = ?
         WHERE id = ? AND user_id = ?`,
        [title, description, repo_url, live_url, id, user.id]
    );

    redirect("/dashboard/projects");
}

export default async function EditProjectPage({ params }) {

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const [rows] = await pool.query(
        "SELECT * FROM projects WHERE id = ? AND user_id = ?",
        [params.id, user.id]
    );

    if (rows.length === 0) {
        redirect("/dashboard/projects");
    }

    const project = rows[0];

    return (

        <main>

            <h1>Editar proyecto</h1>

            <form action={updateProject}>

                <input type="hidden" name="id" value={project.id} />

                <input name="title" defaultValue={project.title} />
                <input name="description" defaultValue={project.description} />
                <input name="repo_url" defaultValue={project.repo_url} />
                <input name="live_url" defaultValue={project.live_url} />

                <button type="submit">Actualizar</button>

            </form>

        </main>
    );
}