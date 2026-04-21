import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// Fuerza que siempre sea dinámico
export const dynamic = "force-dynamic";

// GET /api/users --> Devuelve todos los usuarios
export async function GET() {
  try {

    await connectDB();    //Conectar bbdd

    // Buscar todos los usuarios
    const users = await User.find({});

    // Respuesta correcta
    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    console.error("Detalle del error:", error);
    return NextResponse.json(
      { error: "Error al cargar los usuarios" },
      { status: 500 }
    );
  }
}

// POST /api/users --> Crear nuevo usuario
export async function POST(request) {
  try {
    await connectDB();    //Conectar bbdd

    // Obtener datos enviados
    const body = await request.json();

    // Crear usuario nuevo
    const newUser = await User.create({
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      photo: body.photo,
      password: body.password,
      bio: body.bio,
    });

    // Respuesta usuario creado
    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {
    // Error al guardar usuario
    return NextResponse.json(
      { error: "Usuario no ha sido guardado" },
      { status: 500 }
    );
  }
}