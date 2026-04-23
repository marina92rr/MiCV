"use client";

// Página para loguearse: email + contraseña

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FadeIn from "@/components/FadeIn";

export default function Login() {
  const [loading, setLoading] = useState(false); // Estado carga
  const router = useRouter(); // Navegación

  // Enviar datos login
  async function handleSubmit(event) {
    event.preventDefault(); // Evitar recarga página

    // Crear formulario
    const formData = new FormData(event.target);

    // Guardar datos
    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      setLoading(true);

      // Llamada API login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Convertir respuesta
      const data = await response.json();

      // Si error mostrar mensaje
      if (!response.ok) {
        toast.error(data.error || "Error al iniciar sesión");
        return;
      }

      // Guardar usuario y token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      // Avisar cambio sesión
      window.dispatchEvent(new Event("userChanged"));

      // Mensaje correcto
      toast.success(`Bienvenido ${data.user.name}`);

      // Ir a inicio
      router.push("/");
    } catch (error) {
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lg:bg-amber-500 py-40 min-h-[calc(100vh-120px)]">
      {/* Título */}
      <FadeIn animation="fade-down">
        <h1 className="font-serif text-4xl text-center lg:pb-10 lg:text-6xl lg:text-white">
          Iniciar sesión
        </h1>
      </FadeIn>


      {/* Formulario */}
      <FadeIn animation="fade-up">
        <form
          onSubmit={handleSubmit}
          className=" m-auto w-full max-w-xs lg:max-w-md justify-center lg:bg-white lg:rounded-xl lg:p-10 lg:shadow-md"
        >
          {/* Email */}

          <FadeIn animation="fade-left" className="flex flex-col gap-4">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="bg-gray-200 rounded-md p-2"
            />

            {/* Contraseña */}

            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="bg-gray-200 rounded-md p-2"
            />
          </FadeIn>

          {/* Botón */}
          <FadeIn animation="fade-up" className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 p-2 rounded-xl text-white font-bold cursor-pointer"
            >
              {loading ? "Entrando..." : "Iniciar sesión"}
            </button>
          </FadeIn>

        </form>
      </FadeIn>

    </div>
  );
}