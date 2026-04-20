"use client";

import { useEffect, useRef, useState } from "react";

//Abrir o cerra modal
export default function useOpenClose(initialState = false) {
  //Guardar estado
  const [isOpen, setIsOpen] = useState(initialState);
  //Guardar contenido referencia
  const contentRef = useRef(null);
  //Variables
  const open = () => setIsOpen(true);         //Abrir modal
  const close = () => setIsOpen(false);       //Cerrar modal
  const toggle = () => setIsOpen((prev) => !prev);    //Alternar estado

  useEffect(() => {
    //si esta cerrado no hace nada
    if (!isOpen) return;
    //Cerrar con tecla escape
    const handleEscape = (e) => {
      if (e.key === "Escape") close();
    };
    //Cerrar al clickear fuera del contenedor modal
    const handleClickOutside = (e) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target)
      ) {
        close();
      }
    };
    //Eventos activos con modal abierto
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    //Bloquear SCROLL
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    //Limpiar al cerrar
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);
  //Retorna funciones y propiedades
  return {
    isOpen,
    open,
    close,
    toggle,
    contentRef,
  };
}