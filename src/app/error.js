"use client";

// Página de error del App Router
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Error de página
    console.error("APP ERROR:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center px-4">
      {/* Título */}
      <h1 className="font-serif text-4xl lg:text-6xl mb-4">
        Algo ha salido mal
      </h1>
      {/* Mensaje */}
      <p className="text-gray-600 mb-8 max-w-md">
        Se ha producido un error. Puedes intentar recargar la
        sección o volver a la página de inicio.
      </p>
      {/* Recargar página */}
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-xl cursor-pointer transition"
        >
          Volver a intentar
        </button>
        
        <a
          href="/"
          className="border border-amber-500 text-amber-700 hover:bg-amber-50 font-bold px-6 py-2 rounded-xl transition"
        >
          Ir al inicio
        </a>
      </div>
    </div>
  );
}
