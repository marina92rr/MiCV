// Página 404
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center px-4">
      {/* Título */}
      <h1 className="font-serif text-6xl lg:text-8xl text-amber-500 mb-2">
        404
      </h1>
      <h2 className="font-serif text-2xl lg:text-4xl mb-4">
        Página no encontrada
      </h2>

      <p className="text-gray-600 mb-8 max-w-md">
        La página que estás buscando no existe o ha sido movida.
      </p>

      <Link
        href="/"
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-xl transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
