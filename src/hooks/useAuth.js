"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();

  useEffect(() => {
    function loadAuth() {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      setUser(
        storedUser &&
        storedUser !== "null" &&
        storedUser !== "undefined"
          ? JSON.parse(storedUser)
          : null
      );

      setToken(
        storedToken &&
        storedToken !== "null" &&
        storedToken !== "undefined"
          ? storedToken
          : null
      );
    }

    loadAuth();

    window.addEventListener("userChanged", loadAuth);

    return () => {
      window.removeEventListener("userChanged", loadAuth);
    };
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);

    window.dispatchEvent(new Event("userChanged"));

    router.push("/");
  }

  return {
    user,
    token,
    isLogged: !!token,
    isAdmin: !!user?.isAdmin,
    logout,
  };
}