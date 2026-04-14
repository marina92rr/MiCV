"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
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
        localStorage.removeItem("user");
        setUser(null);
        window.dispatchEvent(new Event("userChanged"));
        router.push("/");
    }

    return (
        <nav className='h-16'>
            <ul className='flex absolute left-0 top-0 p-4 gap-4'>
                {user ? (
                    <>
                        <li>
                            <span>{user.name}</span>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-600 transition"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/auth/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/auth/register">Registrar</Link>
                        </li>
                    </>
                )}
            </ul>

            <ul className='flex absolute right-0 top-0 p-4 gap-4'>
                <li className="hover:text-purple-600 transition">
                    <Link href="/">Inicio</Link>
                </li>
                <li className="hover:text-purple-600 transition">
                    <Link href="/">Sobre mí</Link>
                </li>
                <li className="hover:text-purple-600 transition">
                    <Link href="/myProjects">Proyectos</Link>
                </li>
                <li className="hover:text-purple-600 transition">
                    <Link href="/mySkills">Skills</Link>
                </li>
                <li className="hover:text-purple-600 transition">
                    <Link href="/contact">Contacto</Link>
                </li>
            </ul>
        </nav>
    );
}