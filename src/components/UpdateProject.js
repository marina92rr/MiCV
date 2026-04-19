"use client";

import { useEffect, useState } from "react";

export default function UpdateProject({ project, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!open) return;

    fetch("/api/skills")
      .then((r) => r.json())
      .then((data) => {
        setSkills(Array.isArray(data) ? data : []);

        const currentSkills = (project.skills || []).map((s) => {
          if (typeof s === "string") return s;
          if (s?._id) return String(s._id);
          return "";
        });

        setSelected(currentSkills.filter(Boolean));
      })
      .catch(console.error);
  }, [open, project]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const projectData = {
      title: form.get("title"),
      description: form.get("description"),
      urlProject: form.get("urlProject"),
      skills: selected,
    };

    try {
      const res = await fetch(`/api/projects/${project._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setOpen(false);
        onUpdated?.();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-amber-500 cursor-pointer"
      >
        <i className="bi bi-pencil-square text-xl"></i>
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl w-100 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-start">
              <h2 className="text-2xl text-center font-bold font-serif mb-4">
                Actualizar Proyecto
              </h2>

              <label>Título:</label>
              <input
                name="title"
                defaultValue={project.title}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />

              <label>Descripción:</label>
              <textarea
                name="description"
                defaultValue={project.description}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />

              <label>Enlace:</label>
              <input
                name="urlProject"
                defaultValue={project.urlProject}
                className="bg-amber-100 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
              />

              <label>Skills:</label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const skillId = String(skill._id);
                  const active = selected.includes(skillId);

                  return (
                    <button
                      type="button"
                      key={skillId}
                      onClick={() =>
                        setSelected((prev) =>
                          active
                            ? prev.filter((id) => id !== skillId)
                            : [...prev, skillId]
                        )
                      }
                      className={`px-4 py-2 rounded-xl border transition cursor-pointer ${
                        active
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-white text-black border-gray-300 hover:border-amber-400 hover:text-amber-400"
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
                className="bg-amber-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-600 transition"
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