"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

//HOOK para autenticación
export default function useAuth() {
  const [user, setUser] = useState(null);   //Datos usuario
  const [token, setToken] = useState(null); //token

  const router = useRouter();

  //Cargar datos en localStorage
  useEffect(() => {
    function loadAuth() {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      //Si existe usuario guardarlo
      setUser(
        storedUser &&
          storedUser !== "null" &&
          storedUser !== "undefined"
          ? JSON.parse(storedUser)
          : null
      );
      //Si existe token guardarlo
      setToken(
        storedToken &&
          storedToken !== "null" &&
          storedToken !== "undefined"
          ? storedToken
          : null
      );
    }

    loadAuth();
    //Escuchar cambios de sesión
    window.addEventListener("userChanged", loadAuth);
    //Limpiar
    return () => {
      window.removeEventListener("userChanged", loadAuth);
    };
  }, []);
  //Cerrar sesión y eliminar datos usuario y token
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    //Notificar cambio de usuario
    window.dispatchEvent(new Event("userChanged"));
    //Ruta a inicio
    router.push("/");
  }

  return {
    user,
    token,
    isLogged: !!token,    //si esta logueado
    isAdmin: !!user?.isAdmin, //Si es admin
    logout,
  };
}