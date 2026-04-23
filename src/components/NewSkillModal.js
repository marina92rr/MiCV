"use client";

import { useState } from "react";
import { toast } from "sonner";

// Modal para crear una nueva skill
export default function NewSkillModal({ onCreated, open, onClose }) {
  const [loading, setLoading] = useState(false); // Estado de carga

  // Si el modal no está abierto, no renderiza nada
  if (!open) return null;

  // Enviar formulario a la base de datos
  async function handleSubmit(e) {
    e.preventDefault(); // Evita recargar la página

    const formElement = e.currentTarget; // Referencia al formulario real
    const formData = new FormData(formElement); // Obtener datos del formulario

    // Crear objeto con los valores del formulario
    const skillData = {
      name: formData.get("name"),
      level: formData.get("level"),
      icon: formData.get("icon"),
    };

    try {
      setLoading(true);

      // Enviar datos a la API
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(skillData),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      // Mostrar mensaje según la respuesta
      if (res.ok) {
        formElement.reset(); // Limpia el formulario
        toast.success(data.message || "Skill creada correctamente");
        onCreated?.(); // Recarga la lista si se pasa la función
        onClose?.(); // Cierra el modal si existe la función
      } else {
        toast.error(data.error || "Error al crear la skill");
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
      className="fixed inset-0 z-2 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-xs lg:w-100 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Formulario para crear una skill */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h2 className="text-2xl text-center font-bold font-serif mb-4">
            Añadir nueva skill
          </h2>

          {/* Nombre de la skill */}
          <label>Nombre:</label>
          <input
            name="name"
            placeholder="Next.js..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Nivel de la skill */}
          <label>Nivel:</label>
          <input
            name="level"
            placeholder="1-10..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Icono de la skill */}
          <label>Icono:</label>
          <input
            name="icon"
            placeholder="URL..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Botón para guardar la skill */}
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 my-4 font-bold text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}