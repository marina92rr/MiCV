import { NextResponse } from "next/server";

// POST /api/auth/logout --> Cerrar sesión
export async function POST() {
  // Crear respuesta correcta
  const res = NextResponse.json({
    message: "Logout correcto",
  });

  // Borrar cookie token
  res.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  // Devolver respuesta
  return res;
}