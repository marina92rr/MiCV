import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// GET /api/users/[id] --> Devuelve datos usuario por ID
export async function GET(request, { params }) {
  try {
    // Conectar base de datos
    await connectDB();

    // Obtener id desde la URL
    const { id } = await params;

    // Buscar usuario por id
    const userId = await User.findById(id);

    // Respuesta correcta
    return NextResponse.json(userId, { status: 200 });

  } catch (error) {
    // Error al obtener usuario
    return NextResponse.json(
      { error: "No se ha obtenido el usuario" },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] --> Actualizar usuario por ID
export async function PUT(request, { params }) {
  try {
    // Conectar base de datos
    await connectDB();

    // Obtener id desde la URL
    const { id } = await params;

    // Obtener datos enviados
    const body = await request.json();

    // Actualizar usuario
    const userUpdate = await User.findByIdAndUpdate(
      id,
      {
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        photo: body.photo,
        password: body.password,
        bio: body.bio,
      },
      { new: true } // Devuelve usuario actualizado
    );

    // Respuesta correcta
    return NextResponse.json(userUpdate, { status: 200 });

  } catch (error) {
    // Error al actualizar
    return NextResponse.json(
      { error: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] --> Eliminar usuario por ID
export async function DELETE(request, { params }) {
  try {
    // Conectar base de datos
    await connectDB();

    // Obtener id desde URL
    const { id } = await params;

    // Eliminar usuario
    const result = await User.findByIdAndDelete(id);

    // Si no existe usuario
    if (!result) {
      return NextResponse.json(
        { error: "No se encontró el usuario" },
        { status: 404 }
      );
    }

    // Respuesta correcta
    return NextResponse.json(
      { message: "Usuario eliminado" },
      { status: 200 }
    );

  } catch (error) {
    // Error al eliminar
    return NextResponse.json(
      {
        error: "Error al eliminar",
        details: error.message,
      },
      { status: 500 }
    );
  }
}