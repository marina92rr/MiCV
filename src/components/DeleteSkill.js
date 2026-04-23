"use client";

//Función eliminar SKILL
import { toast } from "sonner"; //Librería para mensajes

//Función eliminar skill
export default function DeleteSkill({ id, onDeleted }) {
  //Botón eliminar
  function handleDelete() {
    //Mensaje eliminar
    toast("¿Eliminar skill?", {
      description: "Esta acción no se puede deshacer.",
      //Acción eliminar
      action: {
        label: "Eliminar",
        onClick: async () => {
          try {
            //Llamada a API con ID para eliminar skill
            const res = await fetch(`/api/skills/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            const data = await res.json();
            
            //Mensaje de eliminado
            if (res.ok) {
              toast.success("La skill se ha eliminado correctamente.");
              onDeleted?.();
            } else {
              toast.error("Error al eliminar skill");
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
  //Se le añade un icono de la librería bootstrap
  return (
    <button
      onClick={handleDelete}
      className="text-red-500 cursor-pointer"
    >
      <i className="bi bi-trash text-xl"></i>
    </button>
  );
}