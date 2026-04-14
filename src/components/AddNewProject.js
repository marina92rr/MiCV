import { useEffect, useState } from "react";
import NewProjectModal from "./NewPojectModal";




export default function AddNewProject() {
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
                    Añadir proyecto
                </button>
            )}

            <NewProjectModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>

    );
}