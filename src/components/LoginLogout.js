"use client";

//Login y logout de la web
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginLogout({ close, hoverColor }) {
    const [user, setUser] = useState(null);     //Estado usuario
    const router = useRouter();


    useEffect(() => {
        //Lectura de usuario
        function loadUser() {
            const storedUser = localStorage.getItem("user");
            //Si existe usuario lo carga
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        }

        loadUser(); //Cargar usuario al iniciar
        window.addEventListener("userChanged", loadUser);   //Escuchar cambios de usuario

        //Limpiar
        return () => {
            window.removeEventListener("userChanged", loadUser);
        };
    }, []);

    //Desloguearse
    function handleLogout() {
        localStorage.removeItem("token");   //Limpiar token del local
        localStorage.removeItem("user");    //Limpiar user del local

        //Recargar página
        setUser(null);
        window.dispatchEvent(new Event("userChanged"));

        close?.(); // cierre menú si existe
        toast.info("¡Hasta otra!");
        router.push("/");   //Inicio
    }

    return (
        <ul className="flex gap-4 lg:gap-15">
            {/* Si esta logueado Nombre de usuario, y boton logout */}
            {user ? (
                <>
                    <li className="text-amber-400 lg:text-xl lg:font-bold">
                        <span>{user.name}</span>
                    </li>
                    <li>
                        <button
                            onClick={handleLogout}
                            className="lg:text-xl cursor-pointer transition hover:text-red-700"
                        >
                            Logout
                        </button>
                    </li>
                </>

            ) : (
                <>
                    {/* Si no esta logueado aparece link Login o Register */}
                    <li className={`transition text-xl ${hoverColor}`}>
                        <Link href="/auth/login" onClick={close}>Login</Link>
                    </li>
                    <li className={`transition text-xl ${hoverColor}`}>
                        <Link href="/auth/register" onClick={close}>Registrar</Link>
                    </li>
                </>
            )}
        </ul>
    );
}