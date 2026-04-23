import { NextResponse } from "next/server";

export function proxy(req) {
  // Continúa con la petición 
  const response = NextResponse.next();

   // Añade un header personalizado para indicar que la petición ha pasado por el proxy
  response.headers.set("x-app-proxy", "active");

  // Devuelve la respuesta sin bloquear rutas
  return response;
}

export const config = {
  // Ejecutar el proxy en todas las rutas de la app
  matcher: ["/:path*"],
};