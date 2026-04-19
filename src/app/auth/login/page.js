"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export default function Login() {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const userData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        try {
            setLoading(true);

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                setModalMessage(data.message || "Error al iniciar sesión");
                setShowModal(true);
                return;
            }

            localStorage.setItem("user", JSON.stringify(data.user));        //Guarda usuario
            localStorage.setItem("token", data.token);                  //Guarda token
            window.dispatchEvent(new Event("userChanged"));
            toast.success(`Bienvenido, ${data.user.name}!`);

            router.push("/");
        } catch (error) {
            setModalMessage("Error al iniciar sesión");
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" lg:bg-amber-500 min-h-screen">
            <h1 className="font-serif text-4xl text-center p-25 lg:text-6xl lg:text-white">Iniciar sesión</h1>
            <form className="flex flex-col gap-4 m-auto w-full lg:bg-white lg:rounded-xl max-w-xs  lg:max-w-md justify-center lg:p-10 lg:shadow-md" onSubmit={handleSubmit}>
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

                <button
                    className="bg-amber-500 hover:bg-amber-600 p-2 rounded-xl text-white font-bold cursor-pointer"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Entrando..." : "Iniciar sesión"}
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