
import mongoose, { mongo } from 'mongoose';

//Modelo de usuario
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
    photo: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    isAdmin: {
        type : Boolean,
        default: false
    }
    
})

export default mongoose.models.User || mongoose.model('User', userSchema);