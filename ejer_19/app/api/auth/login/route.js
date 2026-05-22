import pool from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {

    const { username, password } = await req.json();

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, hashedPassword]
    );

    if (rows.length === 0) {
        return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
    }

    const user = rows[0];

    cookies().set("user", JSON.stringify({
        id: user.id,
        username: user.username
    }), {
        httpOnly: true,
        path: "/"
    });

    return NextResponse.json({ success: true });
}