import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// GET /api/proyects --> Devuelve todos los comentarios ADMIN
export async function GET() {
    try {
        await connectDB();
        const comments = await Comment.find({});

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error("Detalle del error:", error);
        return NextResponse.json(
            { error: 'Error al cargar los comentarios' },
            { status: 500 }
        );
    }
};

// POST /api/proyects --> Crea un nuevo proyecto
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const newProject = await Project.create({
            title: body.title,
            comment: body.comment,
            like: body.like,
            userId: body.userId,
            projectId: body.projectId, 
        })
        return NextResponse.json(newProject, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Comentario no ha sido guardado' })
    }
}