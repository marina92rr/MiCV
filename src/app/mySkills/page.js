"use client";

//Página de skills y acciones según seas admin
import AddNewSkill from "@/components/AddNewSkill";
import DeleteSkill from "@/components/DeleteSkill";
import UpdateSkill from "@/components/UpdateSkill";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import FadeIn from "@/components/FadeIn";


export default function MySkills() {
    const [skills, setSkills] = useState([]);   //Guardar skill
    const [loading, setLoading] = useState(true);   //Carga
    const { isAdmin } = useAuth();          //Si eres admin

    //Función para recoger de la API las skill
    async function fetchSkills() {
        try {
            setLoading(true);

            const res = await fetch("/api/skills");
            const data = await res.json();

            if (!res.ok) {
                console.error("Error API:", data);
                setSkills([]);
                return;
            }

            setSkills(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error cargando habilidades:", error);
            setSkills([]);
        } finally {
            setLoading(false);
        }
    }

    //Carga de skills
    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div className="py-40 bg-gray-50 text-center">
            <FadeIn className="fade-down">
                <h1 className="font-serif text-4xl lg:text-6xl">Skills</h1>
            </FadeIn>
            <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full mt-4"></div>
            {/* Botón Añadir Skill si eres admin*/}
                {isAdmin && (
                    <div className="mt-7">
                        <AddNewSkill onCreated={fetchSkills} />
                    </div>
                )}

            {/* Lectura de skills */}
            <FadeIn animation="fade-down" className="w-full my-10 lg:w-[70%] mx-auto">
                {loading ? (
                    <span>Cargando...</span>
                ) : (
                    <div className="flex flex-wrap justify-center gap-7">
                        {skills.map((skill) => (
                            <div
                                className="rounded-lg shadow-md p-3 w-60 text-center bg-white"
                                key={skill._id}
                            >
                                {/* Icono de la skill */}
                                <FadeIn animation="fade-right">
                                    <picture className="flex justify-center">
                                        <img src={skill.icon} alt={skill.name} />
                                    </picture>
                                </FadeIn>

                                {/* Nombre de la skill */}
                                <FadeIn animation="fade-left" className="text-center">
                                    <h2 className="text-2xl font-serif font-bold">
                                        {skill.name}
                                    </h2>
                                    <p className="text-amber-700">Nivel: {skill.level}</p>
                                </FadeIn>
                                {/* Si eres admin aparecerán estos botones */}
                                {isAdmin && (
                                    <div className="flex gap-2 justify-end">
                                        <UpdateSkill skill={skill} onUpdated={fetchSkills} />
                                        <DeleteSkill id={skill._id} onDeleted={fetchSkills} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </FadeIn>
        </div>
    );
}