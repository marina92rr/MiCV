"use client";

import useOpenClose from "@/hooks/useOpenClose";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createPortal } from "react-dom";

// Actualizar proyecto
export default function UpdateProject({ project, onUpdated }) {
  const { isOpen, open, close, contentRef } = useOpenClose(); // Hook abrir/cerrar
  const [loading, setLoading] = useState(false); // Carga
  const [mounted, setMounted] = useState(false); // Detectar cliente para portal

  // Lista de skills usadas
  const [skills, setSkills] = useState([]);

  // Skills seleccionadas en el proyecto
  const [selected, setSelected] = useState([]);

  // Evitar errores de SSR en Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Si el modal está abierto cargar skills
    if (!isOpen) return;

    fetch("/api/skills")
      .then((r) => r.json())
      .then((data) => {
        // Guardar skills
        setSkills(Array.isArray(data) ? data : []);

        // Obtener ids de skills actuales del proyecto
        const currentSkills = (project.skills || []).map((s) => {
          if (typeof s === "string") return s;
          if (s?._id) return String(s._id);
          return "";
        });

        // Guardar skills seleccionadas
        setSelected(currentSkills.filter(Boolean));
      })
      .catch(console.error);
  }, [isOpen, project]);

  // Enviar formulario actualizado
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Recoger datos del formulario
    const form = new FormData(e.target);

    // Datos actualizados del proyecto
    const projectData = {
      title: form.get("title"),
      description: form.get("description"),
      urlProject: form.get("urlProject"),
      skills: selected,
    };

    try {
      // Petición para actualizar proyecto
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();

      // Si actualiza correctamente
      if (res.ok) {
        toast.success("Proyecto actualizado correctamente");
        onUpdated?.(); // Recargar proyectos
        close(); // Cerrar modal
      } else {
        toast.error(data.error || "Error al actualizar proyecto");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  }

  // Contenido del modal
  const modal = isOpen ? (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4">
      <div
        ref={contentRef}
        className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg"
      >
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-start"
        >
          <h2 className="text-2xl text-center font-bold font-serif mb-4">
            Actualizar Proyecto
          </h2>

          {/* Título */}
          <label>Título:</label>
          <input
            name="title"
            defaultValue={project.title}
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Descripción */}
          <label>Descripción:</label>
          <textarea
            name="description"
            defaultValue={project.description}
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Enlace GitHub */}
          <label>Enlace:</label>
          <input
            name="urlProject"
            defaultValue={project.urlProject}
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Skills */}
          <label>Skills:</label>

          {/* Botones de selección de skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const skillId = String(skill._id);
              const active = selected.includes(skillId);

              return (
                <button
                  type="button"
                  key={skillId}
                  onClick={() =>
                    setSelected((prev) =>
                      active
                        ? prev.filter((id) => id !== skillId)
                        : [...prev, skillId]
                    )
                  }
                  className={`px-4 py-2 rounded-xl border transition cursor-pointer ${
                    active
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-white text-black border-gray-300 hover:border-amber-400 hover:text-amber-400"
                  }`}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>

          {/* Guardar actualización */}
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-600 transition"
          >
            {loading ? "Guardando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Botón abrir formulario */}
      <button
        onClick={open}
        className="text-amber-500 cursor-pointer"
      >
        <i className="bi bi-pencil-square text-xl"></i>
      </button>

      {/* Renderizar modal fuera del árbol con portal */}
      {mounted && typeof document !== "undefined"
        ? createPortal(modal, document.body)
        : null}
    </>
  );
}