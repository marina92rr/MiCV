"use client";

import FadeIn from "@/components/FadeIn";
//Página de registro
import { useState } from "react";
import { toast } from "sonner";

export default function Register() {
  const [loading, setloading] = useState(false);  //Carga

  //Enviar datos para registrar usuario
  async function handleSubmit(event) {
    event.preventDefault();   //Valor
    const formData = new FormData(event.target);    //Formulario

    //Contraseña y validación de contraseña
    const password = formData.get("password");
    const passwordValidate = formData.get("passwordValidate");

    //Si las contraseñas no son iguales aparece mensaje
    if (password !== passwordValidate) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    //Datos a enviar del formulario
    const UserData = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("password"),
      isAdmin: false,
    };

    try {
      setloading(true);
      //Enviar datos a API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData),
      });

      const data = await res.json();

      // Si se elimina aparece mensaje de confirmación
      if (res.ok) {
        toast.success("Usuario registrado correctamente");
        onDeleted?.();
      } else {
        toast.error(data.error || "Error al registrar usuario");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error de conexión");
    }
  }

  return (
    <div className="lg:bg-amber-500 py-40 min-h-screen">
      {/* Título */}
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
            {/* Nombre */}
            <label>Nombre:</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="text"
              name="name"
              placeholder="Nombre..."
            />
            {/* Apellidos */}
            <label>Apellidos:</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="text"
              name="lastname"
              placeholder="Apellidos..."
            />
            {/* Email */}
            <label>Email:</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="email"
              name="email"
              placeholder="Correo electrónico"
            />
            {/* Contraseña */}
            <label>Contraseña</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="password"
              name="password"
            />
            {/* Confirmar contraseña */}
            <label>Confirmar Contraseña</label>
            <input
              className="bg-gray-200 rounded-md p-2"
              type="password"
              name="passwordValidate"
            />
          </FadeIn>
          {/* enviar registro */}
          <FadeIn animation="fade-up" className="mt-8">
            <button
              className="bg-amber-500 hover:bg-amber-600 p-2 rounded-xl text-white font-bold cursor-pointer"
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