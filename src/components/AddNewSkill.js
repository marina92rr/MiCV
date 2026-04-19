"use client";

import NewSkillModal from "./NewSkillModal";
import useAuth from "@/hooks/useAuth";
import useOpenClose from "@/hooks/useOpenClose";

export default function AddNewSkill({ onCreated }) {
    const { isOpen, open, close } = useOpenClose();
    const { user } = useAuth();

    if (!user?.isAdmin) return null;

    return (
        <>
            <button
                onClick={open}
                className="bg-amber-500 p-3 text-white rounded-lg shadow-md hover:bg-amber-600 transition-colors cursor-pointer"
            >
                Añadir Skill
            </button>

            <NewSkillModal
                open={isOpen}
                onClose={close}
                onCreated={onCreated}
            />
        </>
    );
}