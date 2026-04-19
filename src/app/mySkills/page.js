"use client";

import AddNewSkill from "@/components/AddNewSkill";
import DeleteSkill from "@/components/DeleteSkill";
import UpdateSkill from "@/components/UpdateSkill";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function MySkills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAuth();

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

    useEffect(() => {
        fetchSkills();
    }, []);

    return (
        <div className="w-full flex flex-col items-center bg-gray-50 min-h-screen">
            <h1 className="font-serif text-4xl mt-20 lg:text-6xl">Skills</h1>
            <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full mt-4"></div>

            {isAdmin && (
                <div className="mt-7">
                    <AddNewSkill onCreated={fetchSkills} />
                </div>
            )}

            <div className="my-10 flex justify-around flex-wrap">
                {loading ? (
                    <span>Cargando...</span>
                ) : (
                    <div className="flex flex-wrap justify-center">
                        {skills.map((skill) => (
                            <div
                                className="rounded-xl shadow-md m-4 p-3 w-60 text-center bg-white"
                                key={skill._id}
                            >
                                <picture className="flex justify-center">
                                    <img src={skill.icon} alt={skill.name} />
                                </picture>

                                <div className="text-center">
                                    <h2 className="text-2xl font-serif font-bold">
                                        {skill.name}
                                    </h2>
                                    <p className="text-amber-700">Nivel: {skill.level}</p>
                                </div>

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
            </div>
        </div>
    );
}