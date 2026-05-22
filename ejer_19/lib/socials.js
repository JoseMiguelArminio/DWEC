import pool from "./db";

export async function getSocialsByUser(userId) {

    const [rows] = await pool.query(
        "SELECT * FROM social_links WHERE user_id = ?",
        [userId]
    );

    return rows;
}