
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

//GET/api/comments/[id]   --> Conseguir datos comentario id
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

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

//DELETE/api/comments/[id] --> Eliminar comentario por id
export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        // 🔐 sacar token
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "No autenticado" }, { status: 401 });
        }

        const decoded = verifyToken(token);

        if (!decoded?.userId) {
            return NextResponse.json({ error: "Token inválido" }, { status: 401 });
        }

        // 🔍 buscar comentario
        const comment = await Comment.findById(id);

        if (!comment) {
            return NextResponse.json({ error: "No existe" }, { status: 404 });
        }

        // 🔥 comprobar que es suyo
        if (comment.userId.toString() !== decoded.userId) {
            return NextResponse.json({ error: "No puedes borrar esto" }, { status: 403 });
        }

        // 🗑️ borrar
        await Comment.findByIdAndDelete(id);

        return NextResponse.json({ message: "Eliminado" });

    } catch (error) {
        return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
    }
}