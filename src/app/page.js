"use client";

import CardsProject from "@/components/CardsProject";
import FadeIn from "@/components/FadeIn";
import useCardsProjects from "@/hooks/useCardsProject";

export default function Home() {
  // Hook cargar proyectos recientes
  const { projects, loading } = useCardsProjects("/api/projects/recent");

  return (
    <div className="bg-gray-100 pb-6">
      {/* Presentación */}
      <section className="mt-15 flex flex-col items-center justify-center text-center gap-10 lg:mt-0 lg:flex-row lg:justify-between lg:text-left">
        
        {/* Izquierda */}
        <FadeIn animation="fade-right" className="lg:w-1/2 lg:ml-20">
          <div>
            <h2 className="text-amber-300 text-xl my-10">
              Desarrolladora web Full Stack
            </h2>

            <h1 className="font-serif text-4xl mt-10 lg:text-6xl">
              Hola! Mi nombre es Marina
            </h1>

            <p className="my-10 mx-3 font-sans text-base">
              Soy Técnica Superior en Desarrollo de Aplicaciones Web, en búsqueda activa de empleo.
              Me apasiona la programación y me impulsa a aprender continuamente.
              Busco aportar valor a mi equipo y a mi entorno desarrollando soluciones útiles y efectivas.
            </p>
          </div>
        </FadeIn>

        {/* Derecha */}
        <FadeIn
          animation="fade-left"
          className="lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div>
            <picture>
              {/* Imagen webp */}
              <source srcSet="/profile-page.webp" type="image/webp" loading="lazy"/>

              {/* Imagen normal */}
              <img
                src="/profile-page.png"
                alt="Retrato de Marina Ramos Ruiz"
                className="w-full rounded-full lg:rounded-none"
                loading="lazy"
              />
            </picture>
          </div>
        </FadeIn>
      </section>

      {/* Sección proyectos */}
      <section className="my-20">
        <div className="w-11/12 lg:w-3/4 mx-auto">
          
          {/* Título */}
          <FadeIn animation="fade-down">
            <h2 className="font-serif font-bold text-center text-3xl my-4">
              Proyectos
            </h2>

            {/* Línea decoración */}
            <div className="w-60 h-0.5 bg-yellow-400 mx-auto rounded-full"></div>
          </FadeIn>

          {/* Tarjetas proyectos */}
            <CardsProject
              projects={projects}
              loading={loading}
              showSkills={false}
            />
        </div>
      </section>
    </div>
  );
}