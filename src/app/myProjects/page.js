"use client";

import AddNewProject from "@/components/AddNewProject";
import DeleteProject from "@/components/DeleteProject";
import UpdateProject from "@/components/UpdateProject";
import { useEffect, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";


export default function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

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
    <div className="w-full flex flex-col bg-gray-100 items-center  min-h-screen">
      <h1 className="font-serif text-4xl mt-20 lg:text-6xl">Proyectos</h1>
      <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full mt-4"></div>

      {isAdmin && (
        <div className="mt-7">
          <AddNewProject />
        </div>
      )}

      <div>
        <section className="my-10 flex justify-center ">
          <div>
            {loading ? (
              <p className="text-center mt-15">Cargando proyectos...</p>
            ) : projects.length === 0 ? (
              <p className="text-center">No hay proyectos disponibles.</p>
            ) : (
              <div className="m-6 flex flex-col lg:max-w-300 gap-10">
                {projects.map((project, index) => (
                  <div
                    key={project._id}
                    className="grid overflow-hidden bg-white shadow-md rounded-3xl hover:shadow-lg transition lg:grid-cols-2"
                  >
                    <div
                      className={`
                        p-7 flex flex-col justify-center 
                        ${index % 2 === 0
                          ? "lg:order-1 lg:items-start lg:text-left"
                          : "lg:order-2 lg:items-end lg:text-right"}
                      `}
                    >

                      <h3 className="font-serif text-center text-3xl font-bold">{project.title}</h3>
                      <div className="flex justify-center gap-2 flex-wrap mt-4">
                        {project.skills?.map((s) => (
                          <span key={s._id} className="bg-gray-200 shadow px-3 py-1 rounded-full text-sm">
                            {s.name}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-gray-600">
                        {project.description.length > 120
                          ? project.description.slice(0, 120) + "..."
                          : project.description}
                      </p>

                      <Link
                        href={`/myProjects/${project._id}`}
                        className={`self-center bg-white shadow px-6 py-2 mt-6 border border-black rounded-full hover:bg-amber-500 hover:text-white hover:border-amber-500 transition
                          ${index % 2 === 0 ? "lg:self-start" : "lg:self-end"}`}
                      >
                        Ver proyecto
                      </Link>
                      {isAdmin && (
                        <div className="flex gap-2 mt-6 justify-end">
                          <UpdateProject project={project} onUpdated={fetchProjects} />
                          <DeleteProject id={project._id} onDeleted={fetchProjects} />
                        </div>
                      )}

                    </div>

                    <div
                      className={`bg-white flex items-center justify-center p-0 ${index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                        }`}
                    >
                      <img
                        src={`/projects/${project.logoProject}`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                  </div>

                ))}
              </div>
            )}
          </div>

        </section>
      </div>
    </div>
  );
}