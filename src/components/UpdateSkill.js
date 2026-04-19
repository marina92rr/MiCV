"use client";

import { useState } from "react";

export default function UpdateSkill({ skill, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const skillData = {
      name: form.get("name"),
      level: form.get("level"),
      icon: form.get("icon"),
    };

    try {
      const res = await fetch(`/api/skills/${skill._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(skillData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setOpen(false);
        if (onUpdated) onUpdated();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-amber-500 cursor-pointer">
        <i className="bi bi-pencil-square text-xl"></i>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="bg-white p-6 rounded-xl w-xs  lg:w-100 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-start">
              <h2 className="text-2xl text-center font-bold font-serif mb-4">Actualizar Skill</h2>
              <label >Nombre:</label>

              <input
                name="name"
                defaultValue={skill.name}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <label >Nivel:</label>
              <input
                name="level"
                defaultValue={skill.level}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <label>Icono:</label>
              <input
                name="icon"
                defaultValue={skill.icon}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />

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