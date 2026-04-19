"use client";
import { useState } from "react";

export default function Register() {
    const [loading, setloading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const password = formData.get("password");
        const passwordValidate = formData.get("passwordValidate");

        if (password !== passwordValidate) {
            setModalMessage("Las contraseñas no coinciden");
            setShowModal(true);
            return;
        }

        const UserData = {
            name: formData.get("name"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            photo: formData.get("photo"),
            password: formData.get("password"),
            bio: formData.get("bio"),
            isAdmin: false,
        };

        try {
            setloading(true);

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserData)
            });

            const data = await response.json();

            if (!response.ok) {
                setModalMessage(data.message || "Error al registrar usuario");
                setShowModal(true);
                return;
            }

            console.log("Usuario registrado");
            event.target.reset();

        } catch (error) {
            setModalMessage(error.message || "Error al guardar el usuario");
            setShowModal(true);
        } finally {
            setloading(false);
        }
    }

    return (
        <div className="lg:bg-amber-500 min-h-screen">
      <h1 className="font-serif text-4xl text-center p-25 lg:pb-10 lg:text-6xl lg:text-white">
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

        <label>URL de la foto:</label>
        <input
          className="bg-gray-200 rounded-md p-2"
          type="text"
          name="photo"
          placeholder="https://..."
        />

        <label>Contraseña</label>
        <input
          className="bg-gray-200 rounded-md p-2"
          type="password"
          name="password"
        />


        <label>Biografía</label>
        <textarea
          className="bg-gray-200 rounded-md p-2"
          name="bio"
          rows={4}
        ></textarea>

        <button
          className="bg-amber-500 hover:bg-amber-600 p-2 rounded-xl text-white font-bold cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-80">
            <h2 className="text-lg font-bold mb-3">Error</h2>
            <p className="mb-4">{modalMessage}</p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
    );
}