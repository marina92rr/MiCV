"use client";                                                                                                                                  
  //Si no funciona error.js                            
  import "./globals.css";                                                                        
   
  export default function GlobalError({ error, reset }) {                                                                                        
    return (                                                                                           
      <html lang="es">                         
        <body className="font-sans">
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-8">  
            {/* Título                                             */}
            <h1 className="text-4xl font-bold mb-4">Error crítico</h1>
            <p className="text-gray-600 mb-8 max-w-md">                                                                                          
              {error?.message || "Ha ocurrido un error inesperado."}                                   
            </p>        
            {/* Recargar                                                                                                                          */}
            <button                                                                                    
              onClick={() => reset()}                                                                                                            
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 rounded-xl cursor-pointer transition"
            >                                                                                                                                    
              Reintentar
            </button>                                                                                                                            
          </div>                                                                                       
        </body>                                
      </html>
    );
  }