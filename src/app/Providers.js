
"use client";

//sesión para NextAuth
import { SessionProvider } from "next-auth/react";

// Envuelve toda la app para acceder a la sesión
export default function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>);
}