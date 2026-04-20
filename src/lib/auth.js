import jwt from "jsonwebtoken";

//Clave
const JWT_SECRET = process.env.JWT_SECRET;
//Generar Token
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}
//Validación de TOKEN
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;  //token inválido
  }
}