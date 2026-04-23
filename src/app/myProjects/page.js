"use client";

//Página de todos los proyectos
import AddNewProject from "@/components/AddNewProject";
import CardsProject from "@/components/CardsProject";
import FadeIn from "@/components/FadeIn";
import useAuth from "@/hooks/useAuth";
import useCardsProjects from "@/hooks/useCardsProject";

export default function MyProjects() {
  const { isAdmin } = useAuth();    //Si eres admin
  const { projects, loading, fetchProjects } = useCardsProjects("/api/projects"); //Usar carga de proyecto mediante API

  return (
    <div className="w-full flex flex-col py-40 bg-gray-100 items-center min-h-[calc(100vh-120px)]">
      <FadeIn animation="fade-down">
        <h1 className="font-serif text-4xl lg:text-6xl">Proyectos</h1>
      </FadeIn>
      <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full mt-4"></div>
      {/* Si eres admin aparece añadir proyecto */}
    
        {isAdmin && (
          <div className="mt-7">
            <AddNewProject />
          </div>
        )}
     

      {/* Llamada al componente card */}
      <section className="w-11/12 lg:w-3/4 mx-auto">
        <CardsProject
          projects={projects}
          loading={loading}
          isAdmin={isAdmin}
          showSkills={true}
          onReload={fetchProjects}
        />
      </section>
    </div>
  );
}