import { NextResponse } from "next/server";

export function notFoundMiddleware(req) {
  const path = req.nextUrl.pathname;

  if (
    path === "/" ||
    path.startsWith("/projects") ||
    path.startsWith("/admin") ||
    path.startsWith("/api") ||
    path === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  return new NextResponse("Error 404", { status: 404 });
}