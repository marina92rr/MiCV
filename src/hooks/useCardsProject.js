"use client";

import { useEffect, useState } from "react";

//HOOK Reutilizar proyectos
export default function useCardsProjects(endpoint) {
  const [projects, setProjects] = useState([]);   //Estado del proyecto
  const [loading, setLoading] = useState(true);   //

  //Obtener proyectos desde API
  async function fetchProjects() {
    try {
      setLoading(true);

      const res = await fetch(endpoint);  //Según url/router

      //Si falla petición
      if (!res.ok) {
        const text = await res.text();
        console.error("Error API:", text);
        setProjects([]);
        return;
      }

      //Guardar los datos
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando proyectos:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }
  //Ejecutar al cargar o cambiar
  useEffect(() => {
    fetchProjects();
  }, [endpoint]);
  //Devuelve datos
  return { projects, loading, fetchProjects };
}