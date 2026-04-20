"use client";

import CardsProject from "@/components/CardsProject";
import useCardsProjects from "@/hooks/useCardsProject";
import useView from "@/hooks/useView";
import { fadeDown, fadeLeft, fadeRight, fadeUp } from "@/utils/animations";

export default function Home() {
  const { projects, loading } = useCardsProjects("/api/projects/recent");
  const [ref, isVisible] = useView();

  return (
    <div className="bg-gray-100 pb-6">
      <section className="mt-15 flex flex-col items-center justify-center text-center gap-10 lg:mt-0 lg:flex-row lg:justify-between lg:text-left">
        <div ref={ref} className={`lg:w-1/2 lg:ml-20 ${fadeRight(isVisible)}`}>
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

        <div ref={ref} className={`lg:w-1/2 flex justify-center lg:justify-end ${fadeLeft(isVisible)}`}>
          <picture>
            <source srcSet="/profile-page.webp" type="image/webp" />
            <img
              src="/profile-page.png"
              alt="Retrato de Marina Ramos Ruiz"
              className="w-full rounded-full lg:rounded-none"
            />
          </picture>
        </div>
      </section>

      <section className="my-20">
        <div className="w-11/12 lg:w-3/4 mx-auto">
          <h2 ref={ref} className={`font-serif font-bold text-center text-3xl my-4 ${fadeDown(isVisible)}`}>
            Proyectos
          </h2>
          <div className="w-60 h-0.5 bg-yellow-400 mx-auto rounded-full"></div>
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