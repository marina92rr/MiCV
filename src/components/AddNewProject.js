import { useEffect, useState } from "react";
import NewProjectModal from "./NewPojectModal";
import useAuth from "@/hooks/useAuth";
import useOpenClose from "@/hooks/useOpenClose";

//Añadir nuevo proyecto
export default function AddNewProject() {
    const{isOpen,open, close} = useOpenClose(); //hook abrir/cerrar modal
    const {user} = useAuth();   //Usuario

    //Si es admin aparece boton
    return (
        <>
            {user?.isAdmin && (
                <button onClick={open}
                    className="bg-amber-500 p-3 text-white rounded-lg shadow-md hover:bg-amber-600 transition-colors cursor-pointer">
                    Añadir proyecto
                </button>
            )}
            {/* Modal */}
            <NewProjectModal
                open={isOpen}
                onClose={close}
            />
        </>

    );
}