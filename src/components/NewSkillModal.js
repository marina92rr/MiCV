"use client";

import useOpenClose from "@/hooks/useOpenClose";
import { useState } from "react";

//Modal Crear skill
export default function NewSkillModal({ onCreated }) {
  const [loading, setLoading] = useState(false);  //Carga
  const {open, close} = useOpenClose();   //Hook abrir/ cerrar

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
    
      //Si se envia se resetea los valores del form, selección de skill y modal se cierra
      if (res.ok) {
        e.target.reset();
        await onCreated?.();
        close();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={close}>
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