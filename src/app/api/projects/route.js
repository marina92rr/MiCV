// Conexión a la base de datos
import { connectDB } from "@/lib/mongodb";

// Modelos
import Project from "@/models/Project";
import User from "@/models/User";
import Skill from "@/models/Skill";

// Escribir archivos en carpeta public
import { writeFile } from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

// Verificar token login
import { verifyToken } from "@/lib/auth";

// Fuerza que siempre sea dinámico
export const dynamic = "force-dynamic";

// GET /api/projects --> Devuelve todos los proyectos
export async function GET() {
  try {
    
    await connectDB();    //Conectar bbdd

    // Buscar proyectos y relacionar skills + usuario
    const projects = await Project.find()
      .populate("skills", "name")
      .populate("userId", "name lastname");

    // Formatear datos para frontend
    const formattedProjects = projects.map((project) => {
      const obj = project.toObject();

      return {
        ...obj,

        // Formatear skills
        skills: Array.isArray(obj.skills)
          ? obj.skills.map((skill) => ({
              _id: skill._id.toString(),
              name: skill.name,
            }))
          : [],

        // Mostrar nombre usuario
        userId: obj.userId?.name || null,
      };
    });

    // Respuesta correcta
    return NextResponse.json(formattedProjects, { status: 200 });

  } catch (error) {
    console.error("Detalle del error:", error);

    // Error servidor
    return NextResponse.json(
      {
        error: "Error al cargar los proyectos",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// POST /api/projects --> Crear nuevo proyecto
export async function POST(request) {
  try {
    
    await connectDB();    //Conectar bbdd

    // Obtener token
    const token = request.headers
      .get("authorization")
      ?.replace("Bearer ", "");

    // Verificar token
    const decoded = verifyToken(token);

    // Si no existe usuario logueado
    if (!decoded?.userId) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 }
      );
    }

    // Obtener formulario enviado
    const data = await request.formData();

    // Guardar campos formulario
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

    // Guardar imagen proyecto
    if (fields.imageFile && fields.imageFile.size > 0) {
      const bytes = await fields.imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      imageName = fields.imageFile.name.replace(/\s+/g, "-");

      await writeFile(
        path.join(process.cwd(), "public", "projects", imageName),
        buffer
      );
    }

    // Guardar logo proyecto
    if (fields.logoFile && fields.logoFile.size > 0) {
      const bytes = await fields.logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      logoName = fields.logoFile.name.replace(/\s+/g, "-");

      await writeFile(
        path.join(process.cwd(), "public", "projects", logoName),
        buffer
      );
    }

    // Crear proyecto nuevo
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