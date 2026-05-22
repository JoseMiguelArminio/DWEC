import { NextResponse } from "next/server";

export function middleware(req) {

    const cookie = req.cookies.get("user");

    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    if (isDashboard && !cookie) {

        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"]
};