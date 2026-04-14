"use client";

import AddNewProject from "@/components/AddNewProject";
import { useEffect, useState } from "react";

export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProjects() {
    try {
      setLoading(true);

      const res = await fetch("/api/projects");
      const data = await res.json();

      if (!res.ok) {
        console.error("Error API:", data);
        setProjects([]);
        return;
      }

      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando proyectos:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Proyectos</h1>

      <div className="mb-6">
        <AddNewProject />
      </div>

      <div className="flex justify-center gap-3 w-full">
        {loading ? (
          <span>Cargando...</span>
        ) : (
          <div className="flex flex-wrap justify-center">
            {projects.map((project) => (
              <div
                className="border rounded-xl border-red-200 m-4 p-3 w-60 text-center"
                key={project._id}
              >
                <div className="text-start">
                  <p><strong>{project.title}</strong></p>
                  <p>{project.description}</p>
                  <p>{Array.isArray(project.skills) ? project.skills.join(", ") : ""}</p>
                </div>

                <picture className="flex justify-center">
                  <img
                    src={`/projects/${project.imageProject}`}
                    alt={project.title}
                  />

                  <a href={project.urlProject} target="_blank">
                    Ver proyecto
                  </a>
                </picture>

                <div className="flex gap-2 justify-end">
                  {/* <DeleteProject id={project._id} />
                  <UpdateProject id={project._id} /> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}