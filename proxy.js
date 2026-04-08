import { NextResponse } from "next/server";
import { verifyToken } from "@/middlewares/auth";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Rutas públicas
  const publicRoutes = ["/login", "/register", "/api/auth/login", "/api/auth/register"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Proteger zona privada
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile") || pathname.startsWith("/api/private")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/api/private/:path*", "/login", "/register"],
};