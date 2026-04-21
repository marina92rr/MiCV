import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

// POST /api/auth/login --> Iniciar sesión
export async function POST(request) {
  // Obtener datos enviados
  const { email, password } = await request.json();

  await connectDB(); // Conectar bbdd

  // Buscar usuario por email
  const user = await User.findOne({ email });

  // Si no existe usuario o contraseña incorrecta
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      {
        message:
          "El correo electrónico o contraseña no son correctas",
      },
      { status: 401 }
    );
  }

  // Crear token
  const token = signToken({
    userId: user._id.toString(),
    email: user.email,
    isAdmin: user.isAdmin,
  });

  // Respuesta correcta
  return NextResponse.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
      bio: user.bio,
      isAdmin: user.isAdmin,
    },
  });
}