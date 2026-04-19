
import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { NextResponse } from "next/server";

//GET /api/skills/[id] --> Devuelve una habilidad por ID
export async function GET(request, {params}) {
    try {
        await connectDB();
        const {id} = await params;
        
        const skillID = await Skill.findById(id);
        return NextResponse.json(skillID, { status: 200 });

    } catch (error) {
        return NextResponse.json({error: 'No se ha obtenido la habilidad'})
    }
}

// PUT /api/skills/[id] --> Actualiza una habilidad por ID
export async function PUT(request, {params}) {
    try {
        await connectDB();
        const {id} = await params;

        const body = await request.json();
        
        const skillUpdate = await Skill.findByIdAndUpdate(
            id,
            {
                title: body.title,
                level: body.level,
                icon: body.icon,
                userId: body.userId,
            }
        );
        return NextResponse.json(skillUpdate);

    } catch (error) {
        return NextResponse.json({error: 'Error al actualizar la habilidad'})
    }
    
}

// DELETE /api/skills/[id] --> Elimina una habilidad por ID
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params; 
        const result = await Skill.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: "No se encontró la habilidad" }, { status: 404 });
        }

        return NextResponse.json({ message: "Habilidad eliminada" });

    } catch (error) {

        return NextResponse.json(
            { error: "Error al eliminar", details: error.message }, 
            { status: 500 }
        );
    }
}