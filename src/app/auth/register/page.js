
"use client";
import { useState } from "react";


export default function Register() {
    const [loading, setloading] = useState(true);

    //Botón enviar registro
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const UserData = {
            name: formData.get('name'),
            email: formData.get('email'),
            photo: formData.get('photo'),
            password: formData.get('password'),
            bio: formData.get('bio'),
        }

        try {
            await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(UserData)
            });

            if(UserData){
                console.log('Usuario registrado');
                event.target.reset();
            }

        } catch (error) {
            console.log('Error al guardar el usuario', error)
        } finally {
            setloading(false);
        }
    }

    return (
        <div className="flex justify-center">
            <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit}>
                <label>Nombre: </label>
                <input
                    className="bg-gray-200 rounded-md p-2"
                    type="text"
                    name="name"
                    placeholder="Nombre.."></input>
                <label>Email: </label>
                <input
                    className="bg-gray-200 rounded-md p-2"
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"></input>
                <label>Fotografía: </label>
                <input
                    className="bg-gray-200 rounded-md p-2"
                    type="file"
                    name="photo"
                ></input>
                <label>Contraseña</label>
                <input
                    className="bg-gray-200 rounded-md p-2"
                    type="text"
                    name="password"
                ></input>
                <label>Conformar contraseña</label>
                <input
                    className="bg-gray-200 rounded-md p-2"
                    type="text"
                    name="passwordValidate"
                ></input>
                <label>Biografía</label>
                <textarea
                    className="bg-gray-200 rounded-md p-2"
                    type="text"
                    name="bio"
                ></textarea>
                <button
                    className="bg-green-500 hover:bg-green-400 p-2 rounded-xl text-white font-bold cursor-pointer"
                    type="submit">Guardar</button>
            </form>
        </div>
    )
}
