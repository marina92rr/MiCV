
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

//GET/api/comments/[id]   --> Conseguir datos comentario id
export async function GET(request, {params}) {
    try {
        await connectDB();
        const {id} = await params;
        
        const commentID = await Comment.findById(id);
        return NextResponse.json(commentID, { status: 200 });

    } catch (error) {
        return NextResponse.json({error: 'No se ha obtenido el comentario'})
    }
}

//PUT/api/comments/[id] --> Actualizar comentario por id
export async function PUT(request, {params}) {
    try {
        await connectDB();
        const {id} = await params;

        const body = await request.json();
        
        const commentUpdate = await Comment.findByIdAndUpdate(
            id,
            {
                title: body.title,
                comment: body.comment,
                like: body.like,
                userId: body.userId,
                projectId: body.projectId,
            }
        );
        return NextResponse.json(commentUpdate);

    } catch (error) {
        return NextResponse.json({error: 'Error al actualizar el comentario'})
    }
    
}

//DELETE/api/comments/[id] --> Eliminar comentario por id
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params; 
        const result = await Comment.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: "No se encontró el comentario" }, { status: 404 });
        }

        return NextResponse.json({ message: "Comentario eliminado" });

    } catch (error) {

        return NextResponse.json(
            { error: "Error al eliminar", details: error.message }, 
            { status: 500 }
        );
    }
}