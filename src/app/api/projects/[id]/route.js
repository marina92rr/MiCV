import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getPublicId(url) {
  const parts = url.split("/upload/");
  const pathWithVersion = parts[1];

  if (!pathWithVersion) return null;

  const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, "");
  const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, "");

  return publicId;
}

// GET /api/projects/[id]
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

// PUT /api/projects/[id]
export async function PUT(request, { params }) {
  try {
    await connectDB();  //Conectar a bbdd
    //Recoger parámetros
    const { id } = await params;
    const body = await request.json();

    //buscar proyecto por ID y actualizar datos
    const projectUpdate = await Project.findByIdAndUpdate(
      id,
      {
        title: body.title,
        description: body.description,
        urlProject: body.urlProject,
        skills: body.skills,
      },
      { new: true }
    );
    //Si no existe proyecto error
    if (!projectUpdate) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }
    //Actualizar
    return NextResponse.json(projectUpdate, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al actualizar el proyecto",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]
export async function DELETE(request, { params }) {
  try {
    await connectDB();  //Conectar a bbdd

    const { id } = await params;  //Recoger parámetro

    //Buscar proyecto por ID
    const project = await Project.findById(id);

    //Si no existe error
    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    //Si existe imagen en cloudinary eliminarla
    if (project.imageProject?.includes("res.cloudinary.com")) {
      const publicId = getPublicId(project.imageProject);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    //Si existe logo en cloudinary eliminarla
    if (project.logoProject?.includes("res.cloudinary.com")) {
      const publicId = getPublicId(project.logoProject);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }
    //Encontrar proyecto y eliminar
    await Project.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Proyecto eliminado" },
      { status: 200 }
    );
  } catch (error) {
    console.error("ERROR DELETE PROJECT:", error);

    return NextResponse.json(
      {
        error: "Error al eliminar",
        details: error.message,
      },
      { status: 500 }
    );
  }
}