"use client";

//Eliminar comentario, solo si eres admin o eres el usuario con ID
import { toast } from "sonner";

export default function DeleteComent({ id, token, onDeleted }) {

  //Función eliminar comentario
  async function handleDelete() {

    //Mensaje de eliminar 
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

            //Si se elimina aparece mensaje de confirmación
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
      //Acción cancelar
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