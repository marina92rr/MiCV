"use client";

import { useState } from "react";
import NewProjectModal from "@/components/NewProjectModal";

export default function AdminProjectsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>Proyectos</h1>

      <button onClick={() => setOpen(true)}>
        Nuevo proyecto
      </button>

      <NewProjectModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}