"use client";

import useOpenClose from "@/hooks/useOpenClose";
import { useState } from "react";
import { toast } from "sonner";

//Actualizar Skill
export default function UpdateSkill({ skill, onUpdated }) {
  const { isOpen, open, close, contentRef } = useOpenClose();   //hook abrir/cerrar
  const [loading, setLoading] = useState(false);        //estado carga

  //Enviar datos actualizados
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    //Datos de formulario
    const form = new FormData(e.target);

    const skillData = {
      name: form.get("name"),
      level: form.get("level"),
      icon: form.get("icon"),
    };

    try {
      //Actualizar Skill
      const res = await fetch(`/api/skills/${skill._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(skillData),
      });

      const data = await res.json();

      // Si se elimina aparece mensaje de confirmación
      if (res.ok) {
        toast.success("Skill actualizada correctamente");
        onDeleted?.();
      } else {
        toast.error(data.error || "Error al actualizar Skill");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error de conexión");
    }
  }

  return (
    <>
      {/* Botón actualizar */}
      <button onClick={open} className="text-amber-500 cursor-pointer">
        <i className="bi bi-pencil-square text-xl"></i>
      </button>
      {/* Abrir modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-xl w-xs  lg:w-100 shadow-lg"
            ref={contentRef}
          >
            {/* Formulario actualización */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-start">
              <h2 className="text-2xl text-center font-bold font-serif mb-4">Actualizar Skill</h2>

              {/* Nombre skill */}
              <label >Nombre:</label>
              <input
                name="name"
                defaultValue={skill.name}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />

              {/* Nivel de skill */}
              <label >Nivel:</label>
              <input
                name="level"
                defaultValue={skill.level}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />

              {/* Icono por url */}
              <label>Icono:</label>
              <input
                name="icon"
                defaultValue={skill.icon}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />

              {/* Enviar datos actualizados */}
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-500 my-4 font-bold text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors cursor-pointer"
              >
                {loading ? "Guardando..." : "Actualizar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}