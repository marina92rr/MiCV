import Link from "next/link";
import FadeIn from "./FadeIn";
import UpdateProject from "./UpdateProject";
import DeleteProject from "./DeleteProject";

export default function CardsProject({
  projects = [],
  loading = false,
  isAdmin = false,
  showSkills = true,
  onReload,
}) {
  if (loading) return <p className="text-center mt-15">Cargando proyectos...</p>;
  if (!projects.length) return <p className="text-center">No hay proyectos disponibles.</p>;

  return (
    <div className="my-20 flex flex-col mx-auto lg:max-w-300 gap-10">
      {projects.map((project, index) => {
        const reverse = index % 2 !== 0;

        return (
          <FadeIn
            key={project._id}
            animation={reverse ? "fade-right" : "fade-left"}
          >
            <div className="grid overflow-hidden bg-white shadow-md rounded-3xl hover:shadow-lg transition lg:grid-cols-2">
              <div
                className={`p-7 flex flex-col justify-center ${reverse
                    ? "lg:order-2 lg:items-end lg:text-right"
                    : "lg:order-1 lg:items-start lg:text-left"
                  }`}
              >
                <h3 className="font-serif text-center text-3xl font-bold">
                  {project.title}
                </h3>

                {showSkills && (
                  <div className="flex justify-center gap-2 flex-wrap mt-4">
                    {project.skills?.map((skill) => (
                      <span
                        key={skill._id}
                        className="bg-gray-200 shadow px-3 py-1 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="mt-4 text-gray-600">
                  {project.description?.length > 120
                    ? project.description.slice(0, 120) + "..."
                    : project.description}
                </p>

                <Link
                  href={`/myProjects/${project._id}`}
                  className={`self-center bg-white shadow px-6 py-2 mt-6 border border-black rounded-full hover:bg-amber-500 hover:text-white hover:border-amber-500 transition ${reverse ? "lg:self-end" : "lg:self-start"
                    }`}
                >
                  Ver proyecto
                </Link>

                {isAdmin && (
                  <div className="flex gap-2 mt-6 justify-end">
                    <UpdateProject project={project} onUpdated={onReload} />
                    <DeleteProject id={project._id} onDeleted={onReload} />
                  </div>
                )}
              </div>

              <div
                className={`bg-white flex items-center justify-center p-0 ${reverse ? "lg:order-1" : "lg:order-2"
                  }`}
              >
                <img
                  src={`/projects/${project.logoProject}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}