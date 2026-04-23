import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { roboto, serif } from "./fonts";
import "bootstrap-icons/font/bootstrap-icons.css";

//Título y descripción web
export const metadata = {
  title: "Marina Ramos Ruiz - Mi portfolio online",
  description: "Portfolio online, donde puedes ver mi carrera profesional",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${roboto.variable} ${serif.variable} h-full antialiased`}
    >
      {/* Cuerpo de la web principal */}
      <body className="min-h-[calc(100vh-120px)] flex flex-col">
        {/* Cabecera menú */}
        <header>
          <Navbar />
        </header>
        {/* Cuerpo principal */}
        <main>
          {children}
          <Toaster position="top-center" richColors />
        </main>
        {/* Pie de la página */}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}