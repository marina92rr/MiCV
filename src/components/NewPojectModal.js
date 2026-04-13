"use client";

export default function NewProjectModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Nuevo proyecto</h2>

        <form>
          <input type="text" placeholder="Título" />
          <textarea placeholder="Descripción"></textarea>
          <input type="text" placeholder="URL imagen" />
          <input type="text" placeholder="URL proyecto" />

          <div style={{ marginTop: "1rem" }}>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalStyle = {
  background: "white",
  padding: "2rem",
  borderRadius: "10px",
  width: "400px",
};