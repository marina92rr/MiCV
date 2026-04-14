
import mongoose from 'mongoose';

//Modelo de usuario
const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: true
    },
    userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
})

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);