//Conexión a la base de datos
import { connectDB } from "@/lib/mongodb";
//Modelos
import Project from "@/models/Project";
import User from "@/models/User";
import Skill from "@/models/Skill";

import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

import { verifyToken } from "@/middlewares/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find()
      .populate("skills", "name")
      .populate("userId", "name");

    const formattedProjects = projects.map((project) => {
      const obj = project.toObject();

      return {
        ...obj,
        skills: Array.isArray(obj.skills)
          ? obj.skills.map((skill) => ({
            _id: skill._id.toString(),
            name: skill.name,
          }))
          : [],
        userId: obj.userId?.name || null,
      };
    });

    return NextResponse.json(formattedProjects, { status: 200 });
  } catch (error) {
    console.error("Detalle del error:", error);

    return NextResponse.json(
      {
        error: "Error al cargar los proyectos",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
// POST /api/projects --> Crea un nuevo proyecto
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

    const data = await request.formData();

    const fields = {
      title: data.get("title"),
      description: data.get("description"),
      urlProject: data.get("urlProject"),
      skills: data.getAll("skills"),
      imageFile: data.get("imageProject"),
      logoFile: data.get("logoProject"),
    };

    let imageName = "";
    let logoName = "";

    if (fields.imageFile && fields.imageFile.size > 0) {
      const bytes = await fields.imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      imageName = fields.imageFile.name.replace(/\s+/g, "-");
      await writeFile(
        path.join(process.cwd(), "public", "projects", imageName),
        buffer
      );
    }

    if (fields.logoFile && fields.logoFile.size > 0) {
      const bytes = await fields.logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      logoName = fields.logoFile.name.replace(/\s+/g, "-");
      await writeFile(
        path.join(process.cwd(), "public", "projects", logoName),
        buffer
      );
    }

    const newProject = await Project.create({
      title: fields.title,
      description: fields.description,
      urlProject: fields.urlProject,
      logoProject: logoName,
      imageProject: imageName,
      userId: decoded.userId,
      skills: fields.skills,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Proyecto no guardado",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

