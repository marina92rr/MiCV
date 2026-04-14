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
      <button onClick={() => setOpen(true)} className="text-blue-500">
        Editar
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl w-[400px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                name="name"
                defaultValue={skill.name}
                className="border p-2 rounded-md"
              />

              <input
                name="level"
                defaultValue={skill.level}
                className="border p-2 rounded-md"
              />

              <input
                name="icon"
                defaultValue={skill.icon}
                className="border p-2 rounded-md"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
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