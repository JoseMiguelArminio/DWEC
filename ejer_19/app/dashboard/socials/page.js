import { cookies } from "next/headers";
import pool from "@/lib/db";
import { redirect } from "next/navigation";

async function addSocial(formData) {

    "use server";

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const platform = formData.get("platform");
    const url = formData.get("url");

    await pool.query(
        "INSERT INTO social_links (platform, url, user_id) VALUES (?, ?, ?)",
        [platform, url, user.id]
    );
}

async function deleteSocial(formData) {

    "use server";

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const id = formData.get("id");

    await pool.query(
        "DELETE FROM social_links WHERE id = ? AND user_id = ?",
        [id, user.id]
    );
}

export default async function SocialsPage() {

    const cookieStore = cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie) {
        redirect("/login");
    }

    const user = JSON.parse(userCookie.value);

    const [socials] = await pool.query(
        "SELECT * FROM social_links WHERE user_id = ?",
        [user.id]
    );

    return (

        <main>

            <h1>Redes sociales</h1>

            <form action={addSocial}>

                <input name="platform" placeholder="Plataforma (GitHub, LinkedIn...)" />
                <input name="url" placeholder="URL" />

                <button type="submit">Añadir</button>

            </form>

            <hr />

            {socials.map((s) => (

                <div key={s.id}>

                    <p>{s.platform}</p>
                    <a href={s.url}>{s.url}</a>

                    <form action={deleteSocial}>
                        <input type="hidden" name="id" value={s.id} />
                        <button type="submit">Borrar</button>
                    </form>

                </div>

            ))}

        </main>
    );
}