import CommentByProject from "@/components/CommentByProject";

export default async function ProjectPage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
    cache: "no-store",
  });

  const project = await res.json();

  return (
    <div className="bg-gray-100 py-40">
      <div className="w-[90%] lg:w-[70%] mx-auto flex flex-col items-center">
        <h1 className="font-serif text-4xl lg:text-6xl">{project.title}</h1>
        <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-5"></div>
        <div className="flex gap-2 flex-wrap my-5">
          {project.skills?.map((s) => (
            <span key={s._id} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              {s.name}
            </span>
          ))}
        </div>

        <picture className="rounded-xl my-5">
          <img
            src={`/projects/${project.logoProject}`}
            alt={project.title}
            className="rounded-xl shadow-md"
          />
        </picture>

        <p className="mb-4">{project.description}</p>


        <picture className="rounded-xl my-10">
          <img
            src={`/projects/${project.imageProject}`}
            alt={project.title}
            className="rounded-xl shadow-md"
          />
        </picture>

        <a
          href={project.urlProject}
          target="_blank"
          className="text-xl text-amber-700 font-bold px-6 py-2 rounded-full hover:underline transition"
        >
          Ir a GitHub
        </a>
        {/* COMENTARIOS */}
        
          <CommentByProject projectId={id} />
       

      </div>

    </div>
  );
}