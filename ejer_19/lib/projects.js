import pool from "./db";

export async function getProjectsByUser(userId) {

    const [rows] = await pool.query(
        "SELECT * FROM projects WHERE user_id = ?",
        [userId]
    );

    return rows;
}