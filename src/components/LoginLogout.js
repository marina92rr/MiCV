"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginLogout({ close }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        function loadUser() {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        }

        loadUser();
        window.addEventListener("userChanged", loadUser);

        return () => {
            window.removeEventListener("userChanged", loadUser);
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        window.dispatchEvent(new Event("userChanged"));

        close?.(); // cierre menú si existe

        router.push("/");
    }

    return (
        <ul className="flex gap-4 lg:gap-15">
            {user ? (
                <>
                    <li className="text-amber-400 lg:text-xl lg:font-bold">
                        <span>{user.name}</span>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="lg:text-xl cursor-pointer transition hover:text-red-700"
                        >
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className="hover:text-amber-400 transition text-xl">
                        <Link href="/auth/login" onClick={close}>Login</Link>
                    </li>
                    <li className="hover:text-amber-400 transition text-xl">
                        <Link href="/auth/register" onClick={close}>Registrar</Link>
                    </li>
                </>
            )}
        </ul>
    );
}