"use client";

export default function DeleteSkill({ id, onDeleted }) {
  async function handleDelete() {
    const ok = window.confirm("¿Seguro que quieres eliminar esta skill?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.ok && onDeleted) onDeleted();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-500">
      Eliminar
    </button>
  );
}