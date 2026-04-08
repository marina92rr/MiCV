import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
// Genera un token JWT con los datos del usuario
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}
// Verifica que un token es válido y devuelve sus datos
// Si el token es inválido o ha expirado, devuelve null
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}