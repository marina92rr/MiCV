"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LoginLogout from "./LoginLogout";
import useOpenClose from "@/hooks/useOpenClose";

export default function Navbar() {
    const { isOpen, close, toggle, contentRef } = useOpenClose();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`
                fixed w-full flex justify-between items-center h-15 px-6 transition-all duration-300 z-50
                bg-amber-300
                ${
                    scrolled
                        ? "lg:bg-white lg:shadow-md"
                        : "lg:bg-transparent lg:shadow-none"
                }
            `}
        >
            {/* LG */}
            <div className="hidden lg:flex gap-4">
                <LoginLogout/>
            </div>

            <ul className="hidden lg:flex gap-10 items-center">
                <li><Link href="/">Inicio</Link></li>
                <li><Link href="/about">Sobre mí</Link></li>
                <li><Link href="/myProjects">Proyectos</Link></li>
                <li><Link href="/mySkills">Skills</Link></li>
            </ul>

            {/* BOTÓN HAMBURGUESA */}
            <button
                className="lg:hidden text-amber-50 font-bold text-3xl ml-auto"
                onClick={toggle}
            >
                ☰
            </button>

            {/* MENÚ Móvil */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 lg:hidden">
                    <div
                        ref={contentRef}
                        className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col"
                    >
                        {/* X */}
                        <div className="flex justify-end p-6">
                            <button
                                onClick={close}
                                className="text-3xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* LOGIN Móvil */}
                        <div className="flex flex-col items-center mb-6 text-xl">
                            <LoginLogout close={close}/>
                        </div>

                        {/* LINKS Móvil*/}
                        <ul className="flex flex-col items-center gap-8 text-xl">
                            <li>
                                <Link href="/" onClick={close}>
                                    Inicio
                                </Link>
                            </li>

                            <li>
                                <Link href="/about" onClick={close}>
                                    Sobre mí
                                </Link>
                            </li>

                            <li>
                                <Link href="/myProjects" onClick={close}>
                                    Proyectos
                                </Link>
                            </li>

                            <li>
                                <Link href="/mySkills" onClick={close}>
                                    Skills
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact" onClick={close}>
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}