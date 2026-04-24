
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyToken } from "@/lib/auth";

import fs from "fs";
import path from "path";

import User from "@/models/User";
import Skill from "@/models/Skill";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getPublicId(url) {
  const parts = url.split("/");
  const file = parts[parts.length - 1];
  const folder = parts[parts.length - 2];

  return `${folder}/${file.split(".")[0]}`;
}

// GET /api/projects/[id] --> Devuelve un proyecto por ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

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

    const token = request.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    const decoded = verifyToken(token);

    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    const { id } = params;

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    // Borrar imagen principal
    if (project.imageProject) {
      const publicId = getPublicId(project.imageProject);
      await cloudinary.uploader.destroy(publicId);
    }

    // Borrar logo
    if (project.logoProject) {
      const publicId = getPublicId(project.logoProject);
      await cloudinary.uploader.destroy(publicId);
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Proyecto eliminado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al eliminar",
        details: error.message,
      },
      { status: 500 }
    );
  }
}