"use client";
import { toast } from "sonner";

export default function DeleteProject({ id, onDeleted }) {
  async function handleDelete() {
    toast("¿Eliminar proyecto?", {
      description: "Esta acción no se puede deshacer.",

      action: {
        label: "Eliminar",
        onClick: async () => {
          try {
            const res = await fetch(`/api/projects/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
              toast.success("Proyecto eliminado correctamente");
              onDeleted?.();
            } else {
              toast.error("Error al eliminar el proyecto");
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
    <button onClick={handleDelete} className="text-red-500 cursor-pointer">
      <i className="bi bi-trash text-xl"></i>
    </button>
  );
}