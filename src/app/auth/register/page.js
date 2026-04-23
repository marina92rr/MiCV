"use client";

import FadeIn from "@/components/FadeIn";
import { useState } from "react";
import { toast } from "sonner";

// Página de registro
export default function Register() {
  const [loading, setLoading] = useState(false); // Estado de carga del botón

  // Envía los datos del formulario para registrar al usuario
  async function handleSubmit(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const form = event.currentTarget; // Referencia segura al formulario
    const formData = new FormData(form); // Obtiene los datos del formulario

    // Obtener contraseña y confirmación
    const password = formData.get("password");
    const passwordValidate = formData.get("passwordValidate");

    // Validar que ambas contraseñas coincidan
    if (password !== passwordValidate) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Construir el objeto con los datos del usuario
    const userData = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("password"),
      isAdmin: false,
    };

    try {
      setLoading(true);

      // Enviar los datos al endpoint de registro
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Intentar leer la respuesta como JSON solo si existe
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      // Mostrar el resultado del registro
      if (res.ok) {
        form.reset(); // Limpia el formulario
        toast.success(data.message || "Usuario registrado correctamente");
      } else {
        toast.error(data.error || "Error al registrar usuario");
      }
    } catch (error) {
      console.error("ERROR EN REGISTRO:", error);
      toast.error("Error de conexión");
    } finally {
      setLoading(false); // Restablece siempre el botón
    }
  }

  return (
    <div className="lg:bg-amber-500 py-40 min-h-[calc(100vh-120px)]">
      {/* Título de la página */}
      <FadeIn animation="fade-down">
        <h1 className="font-serif text-4xl text-center lg:pb-10 lg:text-6xl lg:text-white">
          Registro
        </h1>
      </FadeIn>

      {/* Formulario de registro */}
      <FadeIn animation="fade-up">
        <form
          className="m-auto w-full max-w-xs lg:max-w-md justify-center lg:bg-white lg:rounded-xl lg:p-10 lg:shadow-md"
          onSubmit={handleSubmit}
        >
          <FadeIn animation="fade-left" className="flex flex-col gap-4">
            {/* Campo nombre */}
            <label>Nombre:</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="text"
              name="name"
              placeholder="Nombre..."
            />

            {/* Campo apellidos */}
            <label>Apellidos:</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="text"
              name="lastname"
              placeholder="Apellidos..."
            />

            {/* Campo correo electrónico */}
            <label>Email:</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="email"
              name="email"
              placeholder="Correo electrónico"
            />

            {/* Campo contraseña */}
            <label>Contraseña</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="password"
              name="password"
            />

            {/* Campo confirmación de contraseña */}
            <label>Confirmar contraseña</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="password"
              name="passwordValidate"
            />
          </FadeIn>

          {/* Botón para enviar el formulario */}
          <FadeIn animation="fade-up" className="mt-8">
            <button
              className="bg-amber-500 hover:bg-amber-600 p-2 rounded-xl text-white font-bold cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Registrar"}
            </button>
          </FadeIn>
        </form>
      </FadeIn>
    </div>
  );
}