

export default function About() {
    return (
        <div className="bg-gray-100 py-25 min-h-screen">
            <section className=" w-[90%] lg:w-[70%] mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-full lg:w-1/2">
                    <h1 className="font-serif text-center text-4xl mb-4 lg:text-6xl lg:text-start">Sobre mí</h1>
                    <p className="text-gray-500 text-center text-lg lg:text-xl mb-6">
                        Soy una desarrolladora web apasionada por crear experiencias digitales únicas. Con una sólida formación en desarrollo frontend y backend, me especializo en construir aplicaciones web modernas y funcionales. Mi enfoque se centra en la calidad del código, la usabilidad y el diseño intuitivo. Siempre estoy buscando aprender nuevas tecnologías y mejorar mis habilidades para ofrecer soluciones innovadoras a los desafíos del desarrollo web.
                    </p>
                </div>
                <picture className="w-full lg:w-1/3">
                    <source src="/public/profile-about.webp" type="image/webp" alt="Retrato de Marina Ramos Ruiz" className="w-full" />
                    <img
                        src="/profile-about.png"
                        alt="Retrato de Marina Ramos Ruiz"
                        className="w-full"
                    />
                </picture>
            </section>
            <div className="lg:w-[50%] flex flex-col mx-auto my-20">
                <section className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start bg-white p-10 rounded-3xl shadow-md">
                    <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">Experiencia Laboral</h2>
                    <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

                    <article className="mb-6 text-start">
                        <h3 className="text-2xl font-serif m-2">Full Stack Developer</h3>
                        <div className="flex flex-col items-center my-2 lg:flex-row">
                            <p className="text-amber-500 text-xl mx-2">Ayesa </p>
                            <p className="text-gray-500 mb-1">| Febrero 2026 - Actualmente</p>
                        </div>

                        <ul className="list-disc list-inside text-gray-500 mx-4">
                            <li>Desarrollo de aplicación para la web del SAS</li>
                            <li>Colaboración con equipos de desarrollo para crear interfaces de usuario atractivas y funcionales.</li>
                            <li>Implementación de pruebas unitarias y de integración para garantizar la calidad del código.</li>
                            <li><strong>Tecnologías utilizadas:</strong> PHP, JavaScript, CSS, MySQL</li>
                        </ul>
                    </article>
                    <article className="mb-6 text-start">
                        <h3 className="text-2xl font-serif mb-2">Full Stack Developer</h3>
                        <div className="flex flex-col items-center my-2 lg:flex-row">
                            <p className="text-amber-500 text-xl mx-2">Star Factory Sevilla </p>
                            <p className="text-gray-500">| Marzo 2025 - Febrero 2026</p>
                        </div>

                        <ul className="list-disc list-inside text-gray-500 mx-4">
                            <li>Desarrollo de aplicación CRM para la web Star Factory</li>
                            <li>CRM adaptado a gestión de clientes, facturación y suscripciones.</li>
                            <li><strong>Tecnologías utilizadas:</strong> React, MongoDB y Node.js</li>
                        </ul>
                    </article>
                    <article className="mb-6 text-start">
                        <h3 className="text-2xl font-serif mb-2">Full Stack Developer</h3>
                        <div className="flex flex-col items-center my-2 lg:flex-row">
                            <p className="text-amber-500 text-xl mx-2">LinetecomEnergy</p>
                            <p className="text-gray-500">| Mayo 2024 - Febrero 2025</p>
                        </div>

                        <ul className="list-disc list-inside text-gray-500 mx-4">
                            <li>Desarrollo para la web LinetecomEnergy sobre gestión de datos y marketing</li>
                            <li>Implementación de funcionalidades para la gestión de artículos y catálogos.</li>
                            <li><strong>Tecnologías utilizadas:</strong> Angular, Node.js y PHP</li>
                        </ul>
                        <ul className="list-disc list-inside text-gray-500 mx-4">
                            <li>Desarrollo para la web de catálogo online Sireline</li>
                            <li>Implementación de funcionalidades para la gestión de usuarios y financiación de dispositivos.</li>
                            <li><strong>Tecnologías utilizadas:</strong> Angular, Node.js y PHP</li>
                        </ul>
                    </article>
                    <article className="mb-6 text-start">
                        <h3 className="text-2xl font-serif mb-2">Logística</h3>
                        <div className="flex flex-col items-center my-2 lg:flex-row">
                            <p className="text-amber-500 text-xl mx-2">Amazon</p>
                            <p className="text-gray-500">| 2021 - 2024</p>
                        </div>

                        <ul className="list-disc list-inside text-gray-500 mx-4">
                            <li>Operadora en logística con gestión de flujos de preparación de pedidos.</li>
                        </ul>
                    </article>
                    <article className="mb-6 text-start">
                        <h3 className="text-2xl font-serif mb-2">Diseño Gráfico e ilustración</h3>
                        <div className="flex flex-col items-center my-2 lg:flex-row">
                            <p className="text-amber-500 text-xl mx-2">Viredesoft</p>
                            <p className="text-gray-500">| 2016 - 2020</p>
                        </div>

                        <ul className="list-disc list-inside text-gray-500 mx-4">
                            <li>Ilustración y diseño gráfico para webs y apps.</li>
                        </ul>
                    </article>
                </section>
                <section className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start  bg-white p-10 rounded-3xl shadow-md">
                    <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">Datos Académicos</h2>
                    <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

                    <article className="mb-6 text-start">
                        <h3 className="text-2xl font-serif m-2">CEI - Centro de Estudios de Innovación, Diseño y Marketing</h3>
                        <p className="text-xl mx-2 text-gray-500"> Master en Programación Web | 2025 - 2026</p>
                    </article>
                    <article className="mb-6 text-start">
                        <h3 className="text-2xl font-serif mb-2">Ilerna</h3>
                        <p className="text-xl mx-2 text-gray-500">Grado Superior en Desarrollo de Aplicaciones Web | 2023 - 2024</p>

                    </article>
                    <article className="mb-6 text-start">
                        <h3 className="text-2xl font-serif mb-2">Escuela de Arte Mateo Inurria</h3>
                        <p className="text-xl mx-2 text-gray-500">Grado Superior en Ilustración, diseño y artes aplicadas | 2013 - 2015</p>
                        <p className="text-xl mx-2 text-gray-500">Grado Superior en Gráfica publicitaria | 2011 - 2013</p>

                    </article>
                </section>
                <section className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center  bg-white p-10 rounded-3xl shadow-md">
                    <h2 className="font-serif text-3xl mb-4 lg:text-5xl">Idiomas</h2>
                    <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

                    <div className="flex flex-wrap justify-center gap-5">
                        <p className="text-xl mx-2 text-gray-500">Inglés escrito - B1</p>
                        <p className="text-xl mx-2 text-gray-500">Inglés hablado - A2</p>
                    </div>
                </section>
                <section className="w-[90%] lg:w-[70%] mx-auto mt-10 text-center lg:text-start  bg-white p-10 rounded-3xl shadow-md">
                    <h2 className="font-serif text-3xl mb-4 lg:text-5xl text-center">Cursos</h2>
                    <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full my-10"></div>

                    <div className="flex flex-wrap justify-start lg:justify-center gap-5 text-start">
                        <ul className="list-disc list-inside  text-gray-500 mx-4">
                            <li>IA generativa</li>
                            <li>Curso de SEO y Posicionamiento Web</li>
                            <li>Scrum: un marco para el desarrollo ágil</li>
                        </ul>
                        <ul className="list-disc list-inside text-gray-500 mx-4">
                            <li>Java: de cero a experto</li>
                            <li>Drupal</li>
                        </ul>
                    </div>
                </section>
            </div>

        </div>
    );
}