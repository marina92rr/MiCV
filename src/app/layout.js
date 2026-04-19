import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { roboto, serif } from "./fonts";
import "bootstrap-icons/font/bootstrap-icons.css";

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
      <body className="min-h-full flex flex-col">
        <header>
          <Navbar />
        </header>
        <main>
          {children}
          <Toaster position="top-center" richColors />
        </main>
        <footer></footer>
      </body>
    </html>
  );
}