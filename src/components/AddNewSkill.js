import { useEffect, useState } from "react";
import NewSkillModal from "./NewSkillModal";




export default function AddNewSkill() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);



    return (
        <>
            {user?.isAdmin && (
                <button onClick={() => setIsOpen(true)}>
                    Añadir Skill
                </button>
            )}

            <NewSkillModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>

    );
}