"use client";

// Menú principal - header

import { useEffect, useState } from "react";
import Link from "next/link";
import LoginLogout from "./LoginLogout";
import useOpenClose from "@/hooks/useOpenClose";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { isOpen, close, toggle, contentRef } = useOpenClose(); // Hook abrir/cerrar
  const [scrolled, setScrolled] = useState(false); // Estado scroll
  const pathname = usePathname(); // Ruta actual

  useEffect(() => {
    // Detectar scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Limpiar evento
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Páginas con fondo naranja arriba
  const isOrangePage =
    pathname === "/" ||
    pathname === "/auth/login" ||
    pathname === "/auth/register";

  // Hover dinámico
  const hoverClass =
    isOrangePage && !scrolled
      ? "hover:text-white"
      : "hover:text-amber-500";

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
      {/* LG - izquierda */}
      <div className="hidden lg:flex gap-4">
        <LoginLogout close={close} hoverColor={hoverClass}/>
      </div>

      {/* LG - derecha */}
      <ul className="hidden lg:flex gap-10 items-center">
        <li>
          <Link href="/" className={`transition ${hoverClass}`}>
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/about" className={`transition ${hoverClass}`}>
            Sobre mí
          </Link>
        </li>
        <li>
          <Link href="/myProjects" className={`transition ${hoverClass}`}>
            Proyectos
          </Link>
        </li>
        <li>
          <Link href="/mySkills" className={`transition ${hoverClass}`}>
            Skills
          </Link>
        </li>
        <li>
          <Link href="/contact" className={`transition ${hoverClass}`}>
            Contacto
          </Link>
        </li>
      </ul>

      {/* Botón hamburguesa */}
      <button
        className="lg:hidden text-amber-50 font-bold text-3xl ml-auto"
        onClick={toggle}
      >
        ☰
      </button>

      {/* Menú móvil */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 lg:hidden">
          <div
            ref={contentRef}
            className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={close} className="text-3xl">
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center mb-6 text-xl">
              <LoginLogout close={close} />
            </div>

            <ul className="flex flex-col items-center gap-8 text-xl">
              <li><Link href="/" onClick={close}>Inicio</Link></li>
              <li><Link href="/about" onClick={close}>Sobre mí</Link></li>
              <li><Link href="/myProjects" onClick={close}>Proyectos</Link></li>
              <li><Link href="/mySkills" onClick={close}>Skills</Link></li>
              <li><Link href="/contact" onClick={close}>Contacto</Link></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}