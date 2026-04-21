import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// POST /api/auth/register --> Registrar nuevo usuario
export async function POST(request) {
  try {
    // Obtener datos enviados
    const { name, lastname, email, password, bio, isAdmin } =
      await request.json();

    await connectDB(); // Conectar bbdd

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario nuevo
    const user = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      bio,
      isAdmin,
    });

    // Respuesta datos
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        bio: user.bio,
        isAdmin: user.isAdmin,
      },
    });

  } catch (error) {
    // Mostrar error en consola
    console.error("REGISTER ERROR:", error);

    // Respuesta error 
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}