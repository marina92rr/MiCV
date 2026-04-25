
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Rutas públicas que sin token
const PUBLIC_PATHS = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
];

// Ruta solo Admin
const ADMIN_PATHS = ["/api/users"];

// CRUD de admin
const ADMIN_WRITE = {
  "/api/projects": ["POST", "PUT", "DELETE"],
  "/api/skills": ["POST", "PUT", "DELETE"],
};

//Función proxy
export function proxy(req) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Si no es /api/* dejamos pasar
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Auth siempre públicos
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // (GET) menos /api/users
  const isAdminBase = ADMIN_PATHS.some((p) => pathname.startsWith(p));

  if (method === "GET" && !isAdminBase) {
    return NextResponse.next();
  }

  // Obligatorio token
  const auth = req.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

  //Si no token - error de autentificación
  if (!token) {
    return NextResponse.json(
      { error: "No autenticado" },
      { status: 401 }
    );
  }

  // Validar token. Si JWT_SECRET no está, error 500
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: "Configuración del servidor inválida" },
      { status: 500 }
    );
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json(
      { error: "Token inválido" },
      { status: 401 }
    );
  }

  // /api/users/* solo admin
  if (isAdminBase && !decoded.isAdmin) {
    return NextResponse.json(
      { error: "Permiso denegado" },
      { status: 403 }
    );
  }

  // /api/projects o /api/skills solo admin
  for (const [base, methods] of Object.entries(ADMIN_WRITE)) {
    if (
      pathname.startsWith(base) &&
      methods.includes(method) &&
      !decoded.isAdmin
    ) {
      return NextResponse.json(
        { error: "Permiso denegado" },
        { status: 403 }
      );
    }
  }

  // Pasamos el usuario decodificado
  const headers = new Headers(req.headers);
  headers.set("x-user-id", decoded.userId);
  headers.set("x-user-is-admin", String(!!decoded.isAdmin));

  return NextResponse.next({ request: { headers } });
}

// Limitar la ejecución del proxy a /api/* para no afectar a páginas y assets
export const config = {
  matcher: ["/api/:path*"],
};
