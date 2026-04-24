
import mongoose from 'mongoose';

//Modelo de Usuario
//Usuario: Nombre, apellidos, email, contraseña, Administrador
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin: {
        type : Boolean,
        default: false
    }
    
})

//Exportar
export default mongoose.models.User || mongoose.model('User', userSchema);