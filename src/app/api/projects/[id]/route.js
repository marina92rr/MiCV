
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

//GET /api/projects/[id] --> Devuelve un proyecto por ID
export async function GET(request, {params}) {
    try {
        await connectDB();
        const {id} = await params;
        
        const projectID = await Project.findById(id);
        return NextResponse.json(projectID, { status: 200 });

    } catch (error) {
        return NextResponse.json({error: 'No se ha obtenido el proyecto'})
    }
}

// PUT /api/projects/[id] --> Actualiza un proyecto por ID
export async function PUT(request, {params}) {
    try {
        await connectDB();
        const {id} = await params;

        const body = await request.json();
        
        const projectUpdate = await Project.findByIdAndUpdate(
            id,
            {
                title: body.title,
                urlProject: body.urlProject,
                description: body.description,
                userId: body.userId,
                skills: body.skills,
            }
        );
        return NextResponse.json(projectUpdate);

    } catch (error) {
        return NextResponse.json({error: 'Error al actualizar el proyecto'})
    }
    
}

// DELETE /api/projects/[id] --> Elimina un proyecto por ID
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params; 
        const result = await Project.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: "No se encontró el proyecto" }, { status: 404 });
        }

        return NextResponse.json({ message: "Proyecto eliminado" });

    } catch (error) {

        return NextResponse.json(
            { error: "Error al eliminar", details: error.message }, 
            { status: 500 }
        );
    }
}