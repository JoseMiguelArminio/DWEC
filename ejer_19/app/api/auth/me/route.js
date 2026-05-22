import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

    const cookieStore = cookies();
    const user = cookieStore.get("user");

    if (!user) {
        return NextResponse.json({ logged: false });
    }

    return NextResponse.json({
        logged: true,
        user: JSON.parse(user.value)
    });
}