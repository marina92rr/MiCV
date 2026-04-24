//Página para ver proyecto según ID
import { headers } from "next/headers";
import CommentByProject from "@/components/CommentByProject";
import FadeIn from "@/components/FadeIn";

export default async function ProjectPage({ params }) {
  //Obtener ID desde la URL
  const { id } = await params;

  //Obtener host y protocolo dinámicamente
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  //Llamada a la API para traer el proyecto por ID
  const res = await fetch(`${protocol}://${host}/api/projects/${id}`, {
    cache: "no-store",
  });

  //Si falla la petición
  if (!res.ok) {
    throw new Error("No se pudo cargar el proyecto");
  }

  //Convertir respuesta a json
  const project = await res.json();

  return (
    <div className="bg-gray-100 py-40">
      <div className="w-[90%] lg:w-[70%] mx-auto flex flex-col items-center">
        {/* Título proyecto */}
        <FadeIn animation="fade-down">
          <h1 className="font-serif text-4xl lg:text-6xl">
            {project.title}
          </h1>
        </FadeIn>

        {/* Línea decoración */}
        <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-5"></div>

        {/* Mostrar todas las skills del proyecto */}
        <FadeIn animation="fade-up" className="flex gap-2 flex-wrap my-10">
          {project.skills?.map((s) => (
            <span
              key={s._id}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {s.name}
            </span>
          ))}
        </FadeIn>

        {/* Logo del proyecto */}
        <FadeIn animation="fade-left">
          <picture className="rounded-xl my-5">
            <img
              src={project.logoProject}
              alt={project.title}
              className="rounded-xl shadow-md"
              loading="lazy"
            />
          </picture>
        </FadeIn>

        {/* Descripción proyecto */}
        <FadeIn animation="fade-up">
          <p className="my-15">{project.description}</p>
        </FadeIn>

        {/* Imagen del proyecto */}
        <FadeIn animation="fade-right">
          <picture className="rounded-xl my-10">
            <img
              src={project.imageProject}
              alt={project.title}
              className="rounded-xl shadow-md"
              loading="lazy"
            />
          </picture>
        </FadeIn>

        {/* Enlace al proyecto o GitHub */}
        <FadeIn animation="fade-down" className="mt-15">
          <a
            href={project.urlProject}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-amber-700 font-bold px-6 rounded-full hover:underline transition"
          >
            Ir a GitHub
          </a>
        </FadeIn>

        {/* Componente comentarios según ID del proyecto */}
        <CommentByProject projectId={id} />
      </div>
    </div>
  );
}