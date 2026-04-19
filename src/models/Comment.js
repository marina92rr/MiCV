import mongoose from "mongoose";

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
    timestamps: true,
  }
);

// 🔥 ESTA LÍNEA ES LA CLAVE
export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);