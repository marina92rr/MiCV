"use client";

//Eliminar proyecto
import { toast } from "sonner"; //Libreria de mensajería

export default function DeleteProject({ id, onDeleted }) {
  //Función eliminar proyecto
  async function handleDelete() {
    //Mensajería para confirmar que se elimine el proyecto
    toast("¿Eliminar proyecto?", {
      description: "Esta acción no se puede deshacer.",
      //Acción eliminar
      action: {
        label: "Eliminar",
        onClick: async () => {
          try {
            //Llamada a API con ID para eliminar el proyecto
            const res = await fetch(`/api/projects/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const data = await res.json();
            //Mensaje de eliminado
            if (res.ok) {
              toast.success("El proyecto ha sido eliminado correctamente");
              onDeleted?.();
            } else {
              toast.error("Error al eliminar proyecto");
            }
          } catch (error) {
            console.log(error);
            toast.error("Error de conexión");
          }
        },
      },
      //Acción cancelar
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