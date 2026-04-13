import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// GET /api/skills --> Devuelve todas las habilidades
export async function GET() {
    try {
        await connectDB();

        const skills = await Skill.find({});

        return NextResponse.json(skills, { status: 200 });
    } catch (error) {
        console.error("Detalle del error:", error); 
        return NextResponse.json(
            { error: 'Error al cargar las habilidades' },
            { status: 500 }
        );
    }
};

// POST /api/skills --> Crea una nueva habilidad
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const newSkill = await Skill.create({
            name: body.name,
            level: body.level,
            userId: body.userId,
        })
        return NextResponse.json(newSkill, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Habilidad no ha sido guardada' })
    }
}