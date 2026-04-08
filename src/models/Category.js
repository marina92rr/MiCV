import mongoose from "mongoose";

//Modelo de usuario
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String
    }
  },
);

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
