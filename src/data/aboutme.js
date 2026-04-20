//Array de datos para la sesión Aboutme 

//Introducción
export const aboutMe = {
  title: "Sobre mí",
  description:
    "Soy una desarrolladora web apasionada por crear experiencias digitales únicas. Con una sólida formación en desarrollo frontend y backend, me especializo en construir aplicaciones web modernas y funcionales. Mi enfoque se centra en la calidad del código, la usabilidad y el diseño intuitivo. Siempre estoy buscando aprender nuevas tecnologías y mejorar mis habilidades para ofrecer soluciones innovadoras a los desafíos del desarrollo web.",
  image: {
    webp: "/profile-about.webp",
    png: "/profile-about.png",
    alt: "Retrato de Marina Ramos Ruiz",
  },
};

//Experiencia profesional
export const experience = {
  title: "Experiencia Laboral",
  jobs: [
    {
      role: "Full Stack Developer",
      company: "Ayesa",
      date: "Febrero 2026 - Actualmente",
      lists: [
        [
          "Desarrollo de aplicación para la web del SAS",
          "Colaboración con equipos de desarrollo para crear interfaces de usuario atractivas y funcionales.",
          "Implementación de pruebas unitarias y de integración para garantizar la calidad del código.",
          "Tecnologías utilizadas: PHP, JavaScript, CSS, MySQL",
        ],
      ],
    },
    {
      role: "Full Stack Developer",
      company: "Star Factory Sevilla",
      date: "Marzo 2025 - Febrero 2026",
      lists: [
        [
          "Desarrollo de aplicación CRM para la web Star Factory",
          "CRM adaptado a gestión de clientes, facturación y suscripciones.",
          "Tecnologías utilizadas: React, MongoDB y Node.js",
        ],
      ],
    },
    {
      role: "Full Stack Developer",
      company: "LinetecomEnergy",
      date: "Mayo 2024 - Febrero 2025",
      lists: [
        [
          "Desarrollo para la web LinetecomEnergy sobre gestión de datos y marketing",
          "Implementación de funcionalidades para la gestión de artículos y catálogos.",
          "Tecnologías utilizadas: Angular, Node.js y PHP",
        ],
        [
          "Desarrollo para la web de catálogo online Sireline",
          "Implementación de funcionalidades para la gestión de usuarios y financiación de dispositivos.",
          "Tecnologías utilizadas: Angular, Node.js y PHP",
        ],
      ],
    },
    {
      role: "Logística",
      company: "Amazon",
      date: "2021 - 2024",
      lists: [
        [
          "Operadora en logística con gestión de flujos de preparación de pedidos.",
        ],
      ],
    },
    {
      role: "Diseño Gráfico e ilustración",
      company: "Viredesoft",
      date: "2016 - 2020",
      lists: [
        [
          "Ilustración y diseño gráfico para webs y apps.",
        ],
      ],
    },
  ],
};

//Datos académicos
export const education = {
  title: "Datos Académicos",
  studies: [
    {
      center: "CEI - Centro de Estudios de Innovación, Diseño y Marketing",
      items: ["Master en Programación Web | 2025 - 2026"],
    },
    {
      center: "Ilerna",
      items: ["Grado Superior en Desarrollo de Aplicaciones Web | 2023 - 2024"],
    },
    {
      center: "Escuela de Arte Mateo Inurria",
      items: [
        "Grado Superior en Ilustración, diseño y artes aplicadas | 2013 - 2015",
        "Grado Superior en Gráfica publicitaria | 2011 - 2013",
      ],
    },
  ],
};

//Idiomas
export const languages = {
  title: "Idiomas",
  items: ["Inglés escrito - B1", "Inglés hablado - A2"],
};

//Otros cursos
export const courses = {
  title: "Cursos",
  columns: [
    [
      "IA generativa",
      "Curso de SEO y Posicionamiento Web",
      "Scrum: un marco para el desarrollo ágil",
    ],
    ["Java: de cero a experto", "Drupal"],
  ],
};