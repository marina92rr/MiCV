"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import DeleteComent from "./DeleteComent";

export default function CommentByProject({ projectId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { user, token, isLogged } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  async function fetchComments() {
    const res = await fetch(`/api/comments?projectId=${projectId}`);
    const data = await res.json();
    setComments(Array.isArray(data) ? data : []);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token) {
      alert("Debes iniciar sesión para comentar");
      return;
    }

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        comment: text,
        projectId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setTitle("");
      setText("");
      fetchComments();
    } else {
      alert(data.error || "Error al comentar");
    }
  }



  return (
    <div className="mt-10 w-full ">
      <div className="flex flex-col items-center mb-10">
        {isLogged ? (
          <form onSubmit={handleSubmit} className="lg:w-[50%] flex flex-col gap-2 mb-6">
            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-amber-700 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <textarea
              placeholder="Comentario"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border border-amber-700 p-2 rounded-md outline-none focus:outline-none focus:ring-1 focus:ring-amber-500"

            />
            <button className="bg-amber-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-600 transition"
            >
              Comentar
            </button>
          </form>
        ) : (
          <p className="text-gray-500 mb-6">
            Debes iniciar sesión para comentar
          </p>
        )}
      </div>

      <div className="flex flex-col mx-auto w-[90%] lg:w-[80%]">
        {comments.map((coment) => (
          <div key={coment._id} className="bg-white p-6 rounded-lg shadow my-4">
            <div className="flex justify-between items-start">
              <h2 className="font-serif text-xl lg:text-4xl my-4">{coment.title}</h2>

              <p className=" text-gray-400">
                {new Date(coment.createdAt).toLocaleDateString()}
              </p>
            </div>

            <p>{coment.comment}</p>

            <div className="flex justify-between items-center">
              <p className="text-amber-500">
                {coment.userId?.name} {coment.userId?.lastname}
              </p>

              {(user?._id === coment.userId?._id ||
                user?.id === coment.userId?._id) && (
                  <DeleteComent
                    id={coment._id}
                    token={token}
                    onDeleted={fetchComments}
                  />
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}