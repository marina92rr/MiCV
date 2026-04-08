import mongoose, { mongo } from "mongoose";

//Modelo de usuario
const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
  },
  comment: {
    type: String,
    required: true
  },
  like: {
    type: Boolean
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
});

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);
