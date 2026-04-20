import mongoose from "mongoose";

//Modelo Comentarios - Admin/userRegister
//Comentarios: Título, Comentario, ID usuario, ID proyecto
const commentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,         //Fecha de creación
  }
);

//Exportar
export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);