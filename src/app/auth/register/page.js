"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function Register() {
  const [loading, setloading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const password = formData.get("password");
    const passwordValidate = formData.get("passwordValidate");

    if (password !== passwordValidate) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const UserData = {
      name: formData.get("name"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("password"),
      isAdmin: false,
    };

    try {
      setloading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Error al registrar usuario");
        return;
      }

      toast.success("Usuario registrado correctamente");
      event.target.reset();

    } catch (error) {
      toast.error(error.message || "Error al guardar el usuario");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="lg:bg-amber-500 py-40 min-h-screen">
      <h1 className="font-serif text-4xl text-center lg:pb-10 lg:text-6xl lg:text-white">
        Registro
      </h1>

      <form
        className="flex flex-col gap-4 m-auto w-full max-w-xs lg:max-w-md justify-center lg:bg-white lg:rounded-xl lg:p-10 lg:shadow-md"
        onSubmit={handleSubmit}
      >
        <label>Nombre:</label>
        <input
          className="bg-gray-200 rounded-md p-2"
          type="text"
          name="name"
          placeholder="Nombre..."
        />

        <label>Apellidos:</label>
        <input
          className="bg-gray-200 rounded-md p-2"
          type="text"
          name="lastname"
          placeholder="Apellidos..."
        />

        <label>Email:</label>
        <input
          className="bg-gray-200 rounded-md p-2"
          type="email"
          name="email"
          placeholder="Correo electrónico"
        />

        <label>Contraseña</label>
        <input
          className="bg-gray-200 rounded-md p-2"
          type="password"
          name="password"
        />

        <label>Confirmar Contraseña</label>
        <input
          className="bg-gray-200 rounded-md p-2"
          type="password"
          name="passwordValidate"
        />

        <button
          className="bg-amber-500 hover:bg-amber-600 p-2 rounded-xl text-white font-bold cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}