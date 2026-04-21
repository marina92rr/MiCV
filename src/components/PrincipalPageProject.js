
//export default function PrincipalPageProject() {
//    //Sección de CardProyect
//    return (
//        <section className="mt-20">
//            <h2 className="text-3xl font-bold mb-8">Projects</h2>
//
//            <div className="grid gap-6 md:grid-cols-3">
//                {projects.slice(0, 3).map((project) => (
//                    <div key={project._id} className="rounded-xl bg-white shadow p-4">
//                        <img
//                            src={project.imageUrl}
//                            alt={project.title}
//                            className="w-full h-48 object-cover rounded-lg mb-4"
//                        />
//
//                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
//                        <p className="text-gray-600 mb-4">{project.description}</p>
//
//                        <Link
//                            href={`/projects/${project._id}`}
//                            className="text-sm font-medium underline"
//                        >
//                            View Project
//                        </Link>
//                    </div>
//                ))}
//            </div>
//
//            <div className="mt-8 text-center">
//                <Link
//                    href="/projects"
//                    className="inline-block rounded-md bg-yellow-400 px-6 py-2 font-medium"
//                >
//                    Ver todos
//                </Link>
//            </div>
//        </section>
//    )
//}