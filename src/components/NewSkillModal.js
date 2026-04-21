"use client";

import { useState } from "react";
import { toast } from "sonner";

//Modal Crear skill
export default function NewSkillModal({ onCreated, open, onClose }) {
  const [loading, setLoading] = useState(false);  //Carga

  //Si no esta abierto null
  if (!open) return null;
  //Enviar formulario a BBDD
  async function handleSubmit(e) {
    e.preventDefault();   //Valor
    setLoading(true);
    //Creación de formulario
    const form = new FormData(e.target);
    //Recoger valores
    const skillData = {
      name: form.get("name"),
      level: form.get("level"),
      icon: form.get("icon"),
    };
    //Api route al Backend
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(skillData),
      });
      const data = await res.json();

      // Si se elimina aparece mensaje de confirmación
      if (res.ok) {
        toast.success("Skill creada correctamente");
        onDeleted?.();
      } else {
        toast.error(data.error || "Error al crear la Skill");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error de conexión");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-xl w-xs  lg:w-100 shadow-lg" onClick={(e) => e.stopPropagation()}>

        {/* Formulario Crear Skill */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h2 className="text-2xl text-center font-bold font-serif mb-4">Añadir nueva Skill</h2>

          {/* Nombre de Skill */}
          <label >Nombre:</label>
          <input name="name" placeholder="Next.js..." className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500" />

          {/* Nivel de Skill */}
          <label >Nivel:</label>
          <input name="level" placeholder="1-10..." className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500" />

          {/*Icono de Skill(URL) */}
          <label>Icono:</label>
          <input name="icon" placeholder="url..." className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500" />

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 my-4  font-bold text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors cursor-pointer"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}