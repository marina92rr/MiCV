
import mongoose from 'mongoose';

// Modelo de Skills
//Skill = Nombre, nivel, icono, ID usuario
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

//Exportar
export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);