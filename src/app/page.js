"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects/recent");

        if (!res.ok) {
          const text = await res.text();
          console.error("Respuesta API con error:", text);
          setProjects([]);
          return;
        }

        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar proyectos:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-100 pb-6">
      <section className="mt-15 flex flex-col items-center justify-center text-center gap-10 lg:mt-0 lg:flex-row lg:justify-between lg:text-left">
        <div className="lg:w-1/2 lg:ml-20">
          <h2 className="text-amber-300 text-xl my-10">
            Desarrolladora web Full Stack
          </h2>
          <h1 className="font-serif text-4xl mt-10 lg:text-6xl">
            Hola! Mi nombre es Marina
          </h1>
          <p className="my-10 mx-3 font-sans text-base">
            Soy Técnica Superior en Desarrollo de Aplicaciones Web, en búsqueda activa de
            empleo. Me apasiona la programación y me impulsa a aprender continuamente.
            Busco aportar valor a mi equipo y a mi entorno desarrollando soluciones útiles
            y efectivas.
          </p>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <picture>

            <source srcSet="/profile-page.webp" type="image/webp" alt="Retrato de Marina Ramos Ruiz" className="w-full bg-amber-500" />
            <img
              src="/profile-page.png"
              alt="Retrato de Marina Ramos Ruiz"
              className="w-full rounded-full lg:rounded-none"
            />
          </picture>

        </div>
      </section>

      <section className="my-20 flex justify-center">
        <div className="w-11/12 lg:w-3/4">
          <h2 className="font-serif font-bold text-center text-3xl my-4">
            Proyectos
          </h2>
          <div className="w-60 h-0.5 bg-yellow-400 mx-auto rounded-full"></div>


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
  );
}