"use client";

import { useEffect, useRef, useState } from "react";

//Para que aparezcan los elementos según aparezca por pantalla
export default function useView() {
  const ref = useRef(null);     
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Observa cuando el elemento entra en pantalla
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
    // Empieza a observar el elemento
    observer.observe(ref.current);
    // Limpia el observer 
    return () => observer.disconnect();
  }, []);
  // Devuelve referencia y estado
  return [ref, isVisible];
}