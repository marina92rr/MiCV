import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export const dynamic = 'force-dynamic';

// GET /api/comments --> Devuelve todos los comentarios ADMIN
export async function GET(request) {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    const comments = await Comment.find({ projectId })
        .populate("userId", "name lastname")
        .sort({ createdAt: -1 });

    return NextResponse.json(comments);
}

// POST /api/comments --> Crea un nuevo comentario
export async function POST(request) {
  try {
    await connectDB();

    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.title || !body.comment || !body.projectId) {
      return NextResponse.json(
        { error: "Faltan campos" },
        { status: 400 }
      );
    }

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
      { error: "Error al crear comentario", details: error.message },
      { status: 500 }
    );
  }
}