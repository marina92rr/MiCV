import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// GET /api/comments/[id] --> Conseguir comentarios según projectId
export async function GET(request) {
  try {
    await connectDB(); // Conectar bbdd

    // Obtener projectId desde URL
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    // Buscar comentarios del proyecto
    const comments = await Comment.find({ projectId })
      .populate("userId", "name lastname _id")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "No se han obtenido los comentarios" },
      { status: 500 }
    );
  }
}

// DELETE /api/comments/[id] --> Eliminar comentario por id
export async function DELETE(request, { params }) {
  try {
    await connectDB(); // Conectar bbdd

    // Obtener id desde URL
    const { id } = await params;

    // Obtener token
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    // Si no hay token
    if (!token) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    // Verificar token
    const decoded = verifyToken(token);

    // Si token no es válido - error
    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    // Buscar comentario
    const comment = await Comment.findById(id);

    // Si no existe comentario
    if (!comment) {
      return NextResponse.json(
        { error: "No existe" },
        { status: 404 }
      );
    }

    // Comprobar comentario según ID usuario
    if (comment.userId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: "No puedes borrar esto" },
        { status: 403 }
      );
    }

    // Eliminar comentario
    await Comment.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Eliminado" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar" },
      { status: 500 }
    );
  }
}