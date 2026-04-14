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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center"  onClick={onClose}>
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg"  onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="Título"
            className="border p-2 rounded-md"
          />

          <textarea
            name="description"
            placeholder="Descripción"
            className="border p-2 rounded-md"
          />

          <input
            name="urlProject"
            placeholder="URL GitHub"
            className="border p-2 rounded-md"
          />

          <input
            name="imageProject"
            type="file"
            accept="image/*"
          />

          <select
            multiple
            onChange={(e) =>
              setSelected([...e.target.selectedOptions].map((o) => o.value))
            }
            className="border p-2 h-24"
          >
            {skills.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}