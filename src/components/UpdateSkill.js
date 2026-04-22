"use client";

import useOpenClose from "@/hooks/useOpenClose";
import { useState } from "react";
import { toast } from "sonner";
import { createPortal } from "react-dom";

//Actualizar Skill
export default function UpdateSkill({ skill, onUpdated }) {
  const { isOpen, open, close, contentRef } = useOpenClose(); // Hook abrir/cerrar modal

  const [loading, setLoading] = useState(false); // Estado de carga
  const [mounted, setMounted] = useState(false); // Detectar cliente para portal

  // Evitar errores de SSR en Next.js - modal
  useState(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  });

  // Enviar datos actualizados
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Recoger datos del formulario
    const form = new FormData(e.target);

    const skillData = {
      name: form.get("name"),
      level: form.get("level"),
      icon: form.get("icon"),
    };

    try {
      // Petición PUT para actualizar skill
      const res = await fetch(`/api/skills/${skill._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(skillData),
      });

      const data = await res.json();

      // Si actualiza correctamente
      if (res.ok) {
        toast.success("Skill actualizada correctamente");
        onUpdated?.(); // Recargar skills
        close(); // Cerrar modal
      } else {
        toast.error(data.error || "Error al actualizar Skill");
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
      <div
        ref={contentRef}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
      >
        {/* Formulario actualización */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-start">
          <h2 className="mb-4 text-center font-serif text-2xl font-bold">
            Actualizar Skill
          </h2>

          {/* Nombre */}
          <label>Nombre:</label>
          <input
            name="name"
            defaultValue={skill.name}
            className="rounded-md bg-amber-100 p-2 outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Nivel */}
          <label>Nivel:</label>
          <input
            name="level"
            defaultValue={skill.level}
            className="rounded-md bg-amber-100 p-2 outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Icono */}
          <label>Icono:</label>
          <input
            name="icon"
            defaultValue={skill.icon}
            className="rounded-md bg-amber-100 p-2 outline-none focus:ring-1 focus:ring-amber-500"
          />

          {/* Botón actualizar */}
          <button
            type="submit"
            disabled={loading}
            className="my-4 cursor-pointer rounded-md bg-amber-500 px-4 py-2 font-bold text-white transition-colors hover:bg-amber-600"
          >
            {loading ? "Guardando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Botón abrir modal */}
      <button onClick={open} className="cursor-pointer text-amber-500">
        <i className="bi bi-pencil-square text-xl"></i>
      </button>

      {/* Renderizar modal fuera del árbol con portal */}
      {mounted && typeof document !== "undefined"
        ? createPortal(modal, document.body)
        : null}
    </>
  );
}