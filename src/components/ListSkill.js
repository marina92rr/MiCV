"use client";

import { useEffect, useState } from "react";

// Componente para mostrar las skills en formato estático
export default function ListSkill() {
  const [skills, setSkills] = useState([]); // Guardar skills de la API
  const [loading, setLoading] = useState(true); // Estado de carga

  // Cargar skills al iniciar el componente
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("/api/skills");
        const data = await res.json();

        // Si la respuesta es correcta, guardar skills
        if (res.ok) {
          setSkills(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error cargando skills:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  // Mientras carga
  if (loading) {
    return (
      <div className="py-6 text-center">
        <span className="text-gray-500">Cargando skills...</span>
      </div>
    );
  }

  // Si no hay skills
  if (skills.length === 0) {
    return (
      <div className="py-6 text-center">
        <span className="text-gray-500 text-lg">
          No hay skills disponibles.
        </span>
      </div>
    );
  }

  return (
    <section className="w-full my-15">
      {/* Contenedor principal */}
      <div className="flex flex-wrap justify-center gap-10 px-4">
        {/* Recorrer skills */}
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex flex-col items-center gap-2 bg-white p-3 rounded-md shadow" 
          >
            {/* Icono */}
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-15 h-15 object-contain"
            />

            {/* Nombre */}
            <span className="text-sm text-gray-700 font-medium">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}