"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NewProjectModal({ open, onClose, onCreated }) {
  const [skills, setSkills] = useState([]); // Lista de skills disponibles
  const [selected, setSelected] = useState([]); // Skills seleccionadas
  const [loading, setLoading] = useState(false); // Estado de carga

  // Nombre de archivos seleccionados
  const [logoName, setLogoName] = useState("");
  const [imageName, setImageName] = useState("");

  // Cargar skills al abrir modal
  useEffect(() => {
    if (!open) return;

    fetch("/api/skills")
      .then((r) => r.json())
      .then(setSkills)
      .catch(console.error);
  }, [open]);

  if (!open) return null;

  // Enviar formulario
  async function handleSubmit(e) {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // Obtener archivos
    const logoProject = formData.get("logoProject");
    const imageProject = formData.get("imageProject");

    // Validar archivos obligatorios
    if (!logoProject?.name || !imageProject?.name) {
      toast.error("Debes añadir logo e imagen");
      return;
    }

    // Añadir skills seleccionadas
    selected.forEach((id) => formData.append("skills", id));

    try {
      setLoading(true);

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        formElement.reset();
        setSelected([]);
        setLogoName("");
        setImageName("");

        toast.success("Proyecto creado correctamente");

        onCreated?.();
        onClose?.();
      } else {
        toast.error(data.error || "Error al crear proyecto");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h2 className="text-2xl text-center font-bold font-serif mb-4">
            Añadir nuevo proyecto
          </h2>

          {/* Título */}
          <label>Título:</label>
          <input
            name="title"
            placeholder="Star..."
            className="bg-amber-100 p-2 rounded-md"
          />

          {/* Descripción */}
          <label>Descripción:</label>
          <textarea
            name="description"
            placeholder="Este proyecto..."
            className="bg-amber-100 p-2 rounded-md"
          />

          {/* Enlace */}
          <label>Enlace:</label>
          <input
            name="urlProject"
            placeholder="URL GitHub..."
            className="bg-amber-100 p-2 rounded-md"
          />

          <div className="flex justify-center flex-wrap gap-4 mt-2">
            {/* Logo */}
            <div className="flex flex-col text-center">
              <label>Logo:</label>

              <label className="cursor-pointer border mt-2 text-amber-700 border-amber-700 rounded-md p-2 hover:text-amber-500 hover:border-amber-500 transition">
                {logoName || "Seleccionar"}

                <input
                  type="file"
                  name="logoProject"
                  className="hidden"
                  onChange={(e) =>
                    setLogoName(e.target.files?.[0]?.name || "")
                  }
                />
              </label>
            </div>

            {/* Imagen */}
            <div className="flex flex-col text-center">
              <label>Imagen:</label>

              <label className="cursor-pointer border mt-2 text-amber-700 border-amber-700 rounded-md p-2 hover:text-amber-500 hover:border-amber-500 transition">
                {imageName || "Seleccionar"}

                <input
                  type="file"
                  name="imageProject"
                  className="hidden"
                  onChange={(e) =>
                    setImageName(e.target.files?.[0]?.name || "")
                  }
                />
              </label>
            </div>
          </div>

          {/* Skills */}
          <label className="mt-3">Skills:</label>

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
                      : "bg-white border-gray-300"
                  }`}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>

          {/* Guardar */}
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 font-bold text-white px-4 py-2 rounded-md mt-4 hover:bg-amber-600 disabled:opacity-70"
          >
            {loading ? "Guardando..." : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}