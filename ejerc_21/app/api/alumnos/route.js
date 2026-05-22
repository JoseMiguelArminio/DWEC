import pool from "@/lib/db";
import { uploadImage } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";

export async function GET() {

    const [rows] = await pool.query("SELECT * FROM alumno");
    return Response.json(rows);
}

export async function POST(req) {

    const formData = await req.formData();

    const nombre = formData.get("nombre");
    const apellidos = formData.get("apellidos");
    const localidad = formData.get("localidad");
    const file = formData.get("imagen");

    const buffer = Buffer.from(await file.arrayBuffer());

    const filename = `${uuidv4()}.jpg`;

    await uploadImage(buffer, filename, file.type);

    await pool.query(
        "INSERT INTO alumno (nombre, apellidos, localidad, imagen) VALUES (?, ?, ?, ?)",
        [nombre, apellidos, localidad, filename]
    );

    return Response.json({ success: true });
}