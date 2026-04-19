
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

import User from "@/models/User";
import Skill from "@/models/Skill";

// GET /api/projects/[id] --> Devuelve un proyecto por ID

// GET /api/projects/[id]
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    console.log("ID recibido:", id);

    const project = await Project.findById(id)
      .populate("skills", "name")
      .populate("userId", "name");

    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("ERROR GET PROJECT BY ID:", error);

    return NextResponse.json(
      {
        error: "No se ha obtenido el proyecto",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] --> Actualiza un proyecto por ID
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const body = await request.json();

        const projectUpdate = await Project.findByIdAndUpdate(
            id,
            {
                title: body.title,
                description: body.description,
                urlProject: body.urlProject,
                skills: body.skills, // 👈 importante
            },
            { new: true }
        );
        return NextResponse.json(projectUpdate);

    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar el proyecto' })
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