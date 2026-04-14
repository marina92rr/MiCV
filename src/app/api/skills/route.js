import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { NextResponse } from "next/server";
import { verifyToken } from "@/middlewares/auth";

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

    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const decoded = verifyToken(token);

    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const newSkill = await Skill.create({
      name: body.name,
      level: body.level,
      icon: body.icon,
      userId: decoded.userId,
    });

    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Skill no guardada",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

