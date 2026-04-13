export default function Home() {
  return (
    <>
      <div className="flex justify-right">
        <div>
          <h2>Desarrollador Web Full Stack</h2>
          <h1>Bienvenido a mi Portfolio</h1>
          <p>Este es mi portfolio personal donde muestro mis proyectos y habilidades.</p>
          <button>Ver Proyectos</button>
          <a href="/myProjects" target="_blank" rel="noopener noreferrer">
            Linkedin
          </a>
        </div>
        <div>
          <picture>
            <img src="/profile.jpg" alt="Mi foto principal" />
          </picture>
        </div>
      </div>

    </>
  );
}
