"use client";

import AddNewSkill from "@/components/AddNewSkill";
import DeleteSkill from "@/components/DeleteSkill";
import UpdateSkill from "@/components/UpdateSkill";
//import AddNewProject from "@/components/AddNewProject";
import { useEffect, useState } from "react";

export default function MySkills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Habilidades</h1>

            <div className="mb-6">
                <AddNewSkill />
            </div>

            <div className="flex justify-center gap-3 w-full">
                {loading ? (
                    <span>Cargando...</span>
                ) : (
                    <div className="flex flex-wrap justify-center">
                        {skills.map((skill) => (
                            <div
                                className="border rounded-xl border-red-200 m-4 p-3 w-60 text-center"
                                key={skill._id}
                            >
                                <div className="text-start">
                                    <p><strong>{skill.name}</strong></p>
                                    <p>Nivel: {skill.level}</p>
                                </div>

                                <picture className="flex justify-center">
                                    <img
                                        src={`${skill.icon}`}
                                        alt={skill.name}
                                    />
                                </picture>

                                <div className="flex gap-2 justify-end">
                                    <UpdateSkill skill={skill} onUpdated={fetchSkills} />
                                    <DeleteSkill id={skill._id} onDeleted={fetchSkills} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}