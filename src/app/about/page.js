
import {
    aboutMe,
    experience,
    education,
    languages,
    courses,
} from "@/data/aboutme";

export default function About() {
    return (
        <div className="bg-gray-100 py-25 min-h-screen">
            <section className="w-[90%] lg:w-[70%] mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-full lg:w-1/2">
                    <h1 className="font-serif text-center text-4xl mb-4 lg:text-6xl lg:text-start">
                        {aboutMe.title}
                    </h1>
                    <p className="text-gray-500 text-center text-lg lg:text-xl lg:text-start mb-6">
                        {aboutMe.description}
                    </p>
                </div>

                <picture className="w-full lg:w-1/3">
                    <source srcSet={aboutMe.image.webp} type="image/webp" />
                    <img
                        src={aboutMe.image.png}
                        alt={aboutMe.image.alt}
                        className="w-full"
                    />
                </picture>
            </section>
            <div className="lg:w-[50%] flex flex-col mx-auto my-20">
                <section className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start bg-white p-10 rounded-3xl shadow-md">
                    <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">{experience.title}</h2>
                    <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>
                    {experience.jobs.map((job, index) => (
                        <article key={index} className="mb-6 text-start">
                            <h3 className="text-2xl font-serif m-2">{job.role}</h3>
                            <div className="flex flex-col items-center my-2 lg:flex-row">
                                <p className="text-amber-500 text-xl mx-2">{job.company} </p>
                                <p className="text-gray-500 mb-1">| {job.date}</p>
                            </div>
                            {job.lists.map((list, listIndex) => (
                                <ul key={listIndex} className="list-disc list-inside text-gray-500 mx-4">
                                    {list.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            ))}
                        </article>
                    ))}

                </section>
                <section className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start  bg-white p-10 rounded-3xl shadow-md">
                    <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">{education.title}</h2>
                    <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>
                    {education.studies.map((study, index) => (
                        <article key={index} className="mb-6 text-start">
                            <h3 className="text-2xl font-serif m-2">{study.center}</h3>

                            {study.items.map((item, itemIndex) => (
                                <p key={itemIndex} className="text-xl mx-2 text-gray-500">
                                    {item}
                                </p>
                            ))}
                        </article>

                    ))}

                </section>
                <section className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center  bg-white p-10 rounded-3xl shadow-md">
                    <h2 className="font-serif text-3xl mb-4 lg:text-5xl">{languages.title}</h2>
                    <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

                    <div className="flex flex-wrap justify-center gap-5">
                        {languages.items.map((item, index) => (
                            <p key={index} className="text-xl mx-2 text-gray-500">{item}</p>
                        ))}

                    </div>
                </section>
                <section className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start  bg-white p-10 rounded-3xl shadow-md">
                    <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">{courses.title}</h2>
                    <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

                    <div className="flex flex-wrap justify-start lg:justify-center gap-5 text-start">
                        {courses.columns.map((column, index) => (
                            <ul key={index} className="list-disc list-inside  text-gray-500 mx-4">
                                {column.map((course, indexCourse) => (
                                    <li key={indexCourse}>{course}</li>
                                ))}

                            </ul>
                        ))}
                    </div>
                </section>
            </div>
        </div >
    );
}