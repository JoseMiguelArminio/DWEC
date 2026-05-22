import pool from "@/lib/db";
import { deleteImage } from "@/lib/s3";

export async function DELETE(req, { params }) {

    const id = params.id;

    const [rows] = await pool.query(
        "SELECT imagen FROM alumno WHERE id = ?",
        [id]
    );

    if (rows.length > 0) {
        await deleteImage(rows[0].imagen);
    }

    await pool.query(
        "DELETE FROM alumno WHERE id = ?",
        [id]
    );

    return Response.json({ success: true });
}