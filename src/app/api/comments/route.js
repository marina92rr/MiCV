import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Fuerza que siempre sea dinámico
export const dynamic = "force-dynamic";

// GET /api/comments --> Devuelve comentarios según projectId
export async function GET(request) {
  try {
    await connectDB(); // Conectar bbdd

    // Obtener projectId desde la URL
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    // Buscar comentarios del proyecto
    const comments = await Comment.find({ projectId })
      .populate("userId", "name lastname")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Error al cargar comentarios" },
      { status: 500 }
    );
  }
}

// POST /api/comments --> Crear nuevo comentario
export async function POST(request) {
  try {
    await connectDB(); // Conectar bbdd

    // Obtener autorización
    const authHeader = request.headers.get("authorization");

    // Si no hay token o no empieza por Bearer
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    // Sacar token
    const token = authHeader.split(" ")[1];

    // Verificar token
    const decoded = verifyToken(token);

    // Si token no es válido
    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    // Obtener datos enviados
    const body = await request.json();

    // Comprobar campos obligatorios
    if (!body.title || !body.comment || !body.projectId) {
      return NextResponse.json(
        { error: "Faltan campos" },
        { status: 400 }
      );
    }

    // Crear comentario nuevo
    const newComment = await Comment.create({
      title: body.title,
      comment: body.comment,
      projectId: body.projectId,
      userId: decoded.userId,
    });
    return NextResponse.json(newComment, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error al crear comentario",
        details: error.message,
      },
      { status: 500 }
    );
  }
}