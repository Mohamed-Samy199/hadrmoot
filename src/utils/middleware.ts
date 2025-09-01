import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("hadramoot")?.value;
    const role = req.cookies.get("role")?.value;

    const { pathname } = req.nextUrl;

    // لو مش عامل login
    if (!token && pathname.startsWith("/cart")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // لو مش admin
    if (pathname.startsWith("/admin") && role !== "admin") {
        return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/cart", "/wishlist/:path*", "/admin/:path*"],
};
