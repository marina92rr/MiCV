"use client";

// Crear animación al entrar en pantalla
import { useEffect, useRef, useState } from "react";

export default function FadeIn({
  children,                     // Contenido que envuelve
  animation = "fade-up",       // Tipo animación por defecto
  className = "",              // Clases extra opcionales
}) {
  const ref = useRef(null);    // Referencia del bloque
  const [show, setShow] = useState(false); // Estado visible

  // Detecta cuando entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Si entra en pantalla aparece
        if (entry.isIntersecting) {
          setShow(true);
        }
      },
      {
        threshold: 0.1, // Con un 10% visible se activa
      }
    );

    // Observar elemento
    if (ref.current) observer.observe(ref.current);

    // Limpiar observer
    return () => observer.disconnect();
  }, []);

  // Tipos de animaciones
  const animations = {
    // Aparece subiendo
    "fade-up": show
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10",

    // Aparece bajando
    "fade-down": show
      ? "opacity-100 translate-y-0"
      : "opacity-0 -translate-y-10",

    // Aparece desde izquierda
    "fade-left": show
      ? "opacity-100 translate-x-0"
      : "opacity-0 -translate-x-10",

    // Aparece desde derecha
    "fade-right": show
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-10",
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700
        ${animations[animation]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}