"use client";

import { useEffect, useState } from "react";

export default function NewProjectModal({ open, onClose }) {
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    fetch("/api/skills")
      .then((r) => r.json())
      .then(setSkills)
      .catch(console.error);
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    selected.forEach((id) => form.append("skills", id));

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        e.target.reset();
        setSelected([]);
        onClose();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="bg-white p-4 m-4 rounded-xl lg:w-125 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <h2 className="text-2xl text-center font-bold font-serif mb-4">Añadir nuevo Proyecto</h2>
          <label >Título:</label>
          <input
            name="title"
            placeholder="Star..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <label >Descripción:</label>
          <textarea
            name="description"
            placeholder="Este proyecto..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <label >Enlace:</label>
          <input
            name="urlProject"
            placeholder="URL GitHub..."
            className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <div className="flex justify-center flex-wrap text-center gap-4">
            <div className="flex flex-col">
              <label>Logo:</label>
              <label className="cursor-pointer border mt-4 text-amber-700 border-amber-700 rounded-md p-2 hover:text-amber-500 hover:border-amber-500 transition">
                Seleccionar
                <input
                  type="file"
                  name="logoProject"
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex flex-col">
              <label>Imagen:</label>
              <label className="cursor-pointer border mt-4 text-amber-700 border-amber-700 rounded-md p-2 hover:text-amber-500 hover:border-amber-500 transition">
                Seleccionar
                <input
                  type="file"
                  name="imageProject"
                  className="hidden"
                />
              </label>
            </div>
          </div>
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
                        ? prev.filter((id) => id !== skill._id) // quitar
                        : [...prev, skill._id] // añadir
                    )
                  }
                  className={`px-3 py-1 rounded-full border transition
                              ${active
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white text-black border-gray-300 hover:border-amber-400"
                    }`}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-500 font-bold text-white px-4 py-2 rounded-md hover:bg-amber-600 transition-colors cursor-pointer"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}