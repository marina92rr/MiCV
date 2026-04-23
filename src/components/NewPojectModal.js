"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NewProjectModal({ open, onClose }) {
  const [skills, setSkills] = useState([]); // Lista de skills disponibles
  const [selected, setSelected] = useState([]); // Skills seleccionadas
  const [loading, setLoading] = useState(false); // Estado de carga

  // Cargar las skills cuando se abre el modal
  useEffect(() => {

    //Lectura de skills mediante API
    fetch("/api/skills")
      .then((r) => r.json())
      .then(setSkills)
      .catch(console.error);
  }, [open]);

  if (!open) return null;

  // Enviar los datos del formulario
  async function handleSubmit(e) {
    e.preventDefault(); // Evita recargar la página

    const formElement = e.currentTarget; // Referencia al formulario real
    const formData = new FormData(formElement); // Crear FormData a partir del formulario

    // Añadir las skills seleccionadas al FormData
    selected.forEach((id) => formData.append("skills", id));

    try {
      setLoading(true);

      // Enviar los datos del proyecto a la API
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      // Mostrar mensaje según la respuesta de la API
      if (res.ok) {
        formElement.reset(); // Limpia los campos del formulario
        setSelected([]); // Limpia las skills seleccionadas
        toast.success(data.message || "Proyecto creado correctamente");
        onClose?.(); // Cierra el modal si existe la función
      } else {
        toast.error(data.error || "Error al crear proyecto");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión");
    } finally {
      setLoading(false); // Restablece siempre el estado de carga
    }
  }

  return (
    <div
      className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 m-4 rounded-xl lg:w-125 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Formulario para añadir un nuevo proyecto */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h2 className="text-2xl text-center font-bold font-serif mb-4">
            Añadir nuevo proyecto
          </h2>

          {/* Título del proyecto */}
          <label>Título:</label>
          <input
            name="title"
            placeholder="Star..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Descripción del proyecto */}
          <label>Descripción:</label>
          <textarea
            name="description"
            placeholder="Este proyecto..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Enlace al proyecto o a GitHub */}
          <label>Enlace:</label>
          <input
            name="urlProject"
            placeholder="URL GitHub..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          <div className="flex justify-center flex-wrap text-center gap-4">
            {/* Logo del proyecto */}
            <div className="flex flex-col">
              <label>Logo:</label>
              <label className="cursor-pointer border mt-4 text-amber-700 border-amber-700 rounded-md p-2 hover:text-amber-500 hover:border-amber-500 transition">
                Seleccionar
                <input type="file" name="logoProject" className="hidden" />
              </label>
            </div>

            {/* Imagen principal del proyecto */}
            <div className="flex flex-col">
              <label>Imagen:</label>
              <label className="cursor-pointer border mt-4 text-amber-700 border-amber-700 rounded-md p-2 hover:text-amber-500 hover:border-amber-500 transition">
                Seleccionar
                <input type="file" name="imageProject" className="hidden" />
              </label>
            </div>
          </div>

          {/* Selección de skills */}
          <label>Skills:</label>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => {
              const active = selected.includes(skill._id);

              return (
                <button
                  type="button"
                  key={skill._id}
                  onClick={() =>
                    setSelected((prev) =>
                      active
                        ? prev.filter((id) => id !== skill._id)
                        : [...prev, skill._id]
                    )
                  }
                  className={`px-3 py-1 rounded-full border transition ${
                    active
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-black border-gray-300 hover:border-amber-400"
                  }`}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>

          {/* Botón para guardar el proyecto */}
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 font-bold text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}