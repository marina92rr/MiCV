import mongoose from "mongoose";

//Modelo de usuario
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageProject: {
      type: String,
    },
    logoProject: {
      type: String,
    },
    urlProject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
  },
  {
    timestamps: true,   //Tiempo createAt + updateAt
  },
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
