"use client";

import { toast } from "sonner";

export default function DeleteComent({ id, token, onDeleted }) {
  async function handleDelete() {
    toast("¿Eliminar comentario?", {
      description: "Esta acción no se puede deshacer.",
      action: {
        label: "Eliminar",
        onClick: async () => {
          try {
            const res = await fetch(`/api/comments/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
              toast.success("Comentario eliminado correctamente");
              onDeleted?.();
            } else {
              toast.error(data.error || "Error al eliminar el comentario");
            }
          } catch (error) {
            console.log(error);
            toast.error("Error de conexión");
          }
        },
      },
      cancel: {
        label: "Cancelar",
      },
    });
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 cursor-pointer"
    >
      <i className="bi bi-trash text-xl"></i>
    </button>
  );
}