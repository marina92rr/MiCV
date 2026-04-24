// Conexión a la base de datos
import { connectDB } from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";  //Subida de imagenes a cloudinary

// Modelos
import Project from "@/models/Project";
import User from "@/models/User";
import Skill from "@/models/Skill";


import { NextResponse } from "next/server";

// Verificar token login
import { verifyToken } from "@/lib/auth";

// Fuerza que siempre sea dinámico
export const dynamic = "force-dynamic";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2️⃣ Helper
async function uploadToCloudinary(file, folder) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
}

// GET /api/projects --> Devuelve todos los proyectos
// GET /api/projects
export async function GET() {
  try {
    await connectDB();

    const projects = await Project.find()
      .populate("skills", "name")
      .populate("userId", "name lastname")
      .sort({ createdAt: -1 });

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

        // Ya son URLs completas de Cloudinary
        imageProject: obj.imageProject,
        logoProject: obj.logoProject,
      };
    });

    return NextResponse.json(formattedProjects, { status: 200 });
  } catch (error) {
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
// POST /api/projects --> Crear nuevo proyecto
export async function POST(request) {
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

    const data = await request.formData();

    const fields = {
      title: data.get("title"),
      description: data.get("description"),
      urlProject: data.get("urlProject"),
      skills: data.getAll("skills"),
      imageFile: data.get("imageProject"),
      logoFile: data.get("logoProject"),
    };

    let imageUrl = "";
    let logoUrl = "";

    if (fields.imageFile && fields.imageFile.size > 0) {
      imageUrl = await uploadToCloudinary(
        fields.imageFile,
        "projects"
      );
    }

    if (fields.logoFile && fields.logoFile.size > 0) {
      logoUrl = await uploadToCloudinary(
        fields.logoFile,
        "projects/logos"
      );
    }

    const newProject = await Project.create({
      title: fields.title,
      description: fields.description,
      urlProject: fields.urlProject,
      logoProject: logoUrl,
      imageProject: imageUrl,
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