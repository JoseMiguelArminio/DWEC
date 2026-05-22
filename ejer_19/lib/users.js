import pool from "./db";

export async function getUserByUsername(username) {

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );

    return rows[0];
}

export async function getUserById(id) {

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
}