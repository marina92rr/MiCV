"use client";

// Página de skills y acciones según seas admin
import AddNewSkill from "@/components/AddNewSkill";
import DeleteSkill from "@/components/DeleteSkill";
import UpdateSkill from "@/components/UpdateSkill";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import FadeIn from "@/components/FadeIn";

export default function MySkills() {
  const [skills, setSkills] = useState([]); // Guardar skills
  const [loading, setLoading] = useState(true); // Estado de carga
  const { isAdmin } = useAuth(); // Comprobar si es admin

  // Obtener skills desde la API
  async function fetchSkills() {
    try {
      setLoading(true);

      const res = await fetch("/api/skills");
      const data = await res.json();

      if (!res.ok) {
        console.error("Error API:", data);
        setSkills([]);
        return;
      }

      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando habilidades:", error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  }

  // Cargar skills al iniciar la página
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="py-40 bg-gray-50 text-center min-h-[calc(100vh-120px)]">
      {/* Título */}
      <FadeIn animation="fade-down">
        <h1 className="font-serif text-4xl lg:text-6xl">Skills</h1>
      </FadeIn>

      {/* Línea decorativa */}
      <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full mt-4"></div>

      {/* Botón añadir skill solo si eres admin */}
      {isAdmin && (
        <div className="mt-7">
          <AddNewSkill onCreated={fetchSkills} />
        </div>
      )}

      {/* Contenido principal */}
      <FadeIn
        animation="fade-down"
        className="w-full my-10 lg:w-[70%] mx-auto"
      >
        {loading ? (
          // Mensaje mientras carga
          <span>Cargando...</span>
        ) : skills.length === 0 ? (
          // Mensaje si no hay skills
          <p className="text-gray-500 text-lg mt-10">
            No hay skills disponibles.
          </p>
        ) : (
          // Mostrar listado de skills
          <div className="flex flex-wrap justify-center gap-7">
            {skills.map((skill) => (
              <div
                key={skill._id}
                className="rounded-lg shadow-md p-3 w-60 text-center bg-white"
              >
                {/* Icono */}
                <FadeIn animation="fade-right">
                  <picture className="flex justify-center">
                    <img src={skill.icon} alt={skill.name} />
                  </picture>
                </FadeIn>

                {/* Nombre y nivel */}
                <FadeIn animation="fade-left" className="text-center">
                  <h2 className="text-2xl font-serif font-bold">
                    {skill.name}
                  </h2>
                  <p className="text-amber-700">
                    Nivel: {skill.level}
                  </p>
                </FadeIn>

                {/* Botones admin */}
                {isAdmin && (
                  <div className="flex gap-2 justify-end">
                    <UpdateSkill
                      skill={skill}
                      onUpdated={fetchSkills}
                    />
                    <DeleteSkill
                      id={skill._id}
                      onDeleted={fetchSkills}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </FadeIn>
    </div>
  );
}