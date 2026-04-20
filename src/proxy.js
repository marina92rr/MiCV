import { NextResponse } from "next/server";

export function proxy(req) {
  //Respuesta= Continuar con la petición
  const response = NextResponse.next();

  // Añadimos un header - La petición ha pasado por el proxy
  response.headers.set("x-app-proxy", "active");

  // Devolvemos la respuesta sin bloquear ni redirigir rutas
  return response;
}

export const config = {
  // Ejecutar el proxy en todas las rutas
  matcher: ["/:path*"],
};