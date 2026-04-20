

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;    //URL de la bbdd

//Si la variable url no existe, error
if (!MONGODB_URI) {
  throw new Error("Error al realizar la conexión con la BBDD");
}
//Reutilizar la conexión
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }; //Conexión activa / promesa de conexión
}

export async function connectDB() {
  //Si existe la conexión reutiliza
  if (cached.conn) return cached.conn;
  //Si no hay promesa, crear conexión
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false
    })
  };
  //Esperar y guardar
  cached.conn = await cached.promise;
  return cached.conn;
}