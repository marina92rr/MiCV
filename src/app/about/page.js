// Array de datos
import {
  aboutMe,
  experience,
  education,
  languages,
  courses,
} from "@/data/aboutme";

import FadeIn from "@/components/FadeIn"; //Animación

// Página sobre mí / CV
export default function About() {
  return (
    <div className="bg-gray-100 py-25 min-h-screen">
      {/* Presentación principal */}
      <section className="w-[90%] lg:w-[70%] mx-auto flex flex-col lg:flex-row justify-between items-center">

        {/* Texto presentación */}
        <FadeIn animation="fade-left" className="w-full lg:w-1/2">
          <h1 className="font-serif text-center text-4xl mb-4 lg:text-6xl lg:text-start">
            {aboutMe.title}
          </h1>

          <p className="text-gray-500 text-center text-lg lg:text-xl lg:text-start mb-6">
            {aboutMe.description}
          </p>

        </FadeIn>
        {/* Imagen mi foto */}
        <FadeIn animation="fade-right" className="w-full lg:w-1/3">
          <picture >
            <source src={aboutMe.image.webp} alt={aboutMe.image.alt} type="image/webp" loading="lazy"/>
            <img
              src={aboutMe.image.png}
              alt={aboutMe.image.alt}
              className="w-full"
              loading="lazy"
            />
          </picture>
        </FadeIn>
      </section>

      {/* Secciones CV */}
      <div className="w-full lg:w-[80%] flex flex-col mx-auto my-20">


        {/* Experiencia */}
        <FadeIn animation="fade-up" className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start bg-white p-10 rounded-3xl shadow-md">
          <section >
            <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">
              {experience.title}
            </h2>

            <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

            {/* Recorrer trabajos */}
            {experience.jobs.map((job, index) => (
              <article key={index} className="mb-6 text-start">
                <FadeIn animation="fade-up">
                  <h3 className="text-2xl font-serif m-2">{job.role}</h3>

                  {/* Empresa y fecha */}
                  <div className="flex flex-col items-center my-2 lg:flex-row">
                    <p className="text-amber-500 text-xl mx-2">{job.company}</p>
                    <p className="text-gray-500 mb-1">| {job.date}</p>
                  </div>
                </FadeIn>

                {/* Lista funciones */}
                <FadeIn animation="fade-left">
                  {job.lists.map((list, listIndex) => (
                    <ul
                      key={listIndex}
                      className="list-disc list-inside text-gray-500 mx-4"
                    >
                      {list.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  ))}
                </FadeIn>
              </article>
            ))}
          </section>
        </FadeIn>

        {/* Estudios */}
        <FadeIn animation="fade-up" className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start bg-white p-10 rounded-3xl shadow-md">
          <section >
            <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">
              {education.title}
            </h2>
            <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

            {/* Recorrer estudios */}
            {education.studies.map((study, index) => (
              <article key={index} className="mb-6 text-start">
                <FadeIn animation="fade-down">
                  <h3 className="text-2xl font-serif m-2">{study.center}</h3>
                </FadeIn>
                {/* Datos estudio */}
                <FadeIn animation="fade-left">
                  {study.items.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-xl mx-2 text-gray-500">
                      {item}
                    </p>
                  ))}
                </FadeIn>


              </article>
            ))}
          </section>
        </FadeIn>


        {/* Idiomas */}
        <FadeIn animation="fade-up" className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center bg-white p-10 rounded-3xl shadow-md">
          <section >
            <h2 className="font-serif text-3xl mb-4 lg:text-5xl">
              {languages.title}
            </h2>

            <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

            {/* Recorrer idiomas */}
            <FadeIn animation="fade-down" className="flex flex-wrap justify-center gap-5">
              {languages.items.map((item, index) => (
                <p key={index} className="text-xl mx-2 text-gray-500">
                  {item}
                </p>
              ))}
            </FadeIn>

          </section>
        </FadeIn>


        {/* Cursos */}
        <FadeIn animation="fade-up" className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start bg-white p-10 rounded-3xl shadow-md">
          <section >
            <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">
              {courses.title}
            </h2>

            <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

            {/* Recorrer ul cursos */}
            <FadeIn animation="fade-down" className="flex flex-wrap justify-start lg:justify-center gap-5 text-start">
              {courses.columns.map((column, index) => (
                <ul
                  key={index}
                  className="list-disc list-inside text-gray-500 mx-4"
                >
                  {column.map((course, indexCourse) => (
                    <li key={indexCourse}>{course}</li>
                  ))}
                </ul>
              ))}
            </FadeIn>

          </section>
        </FadeIn>

      </div>
    </div>
  );
}