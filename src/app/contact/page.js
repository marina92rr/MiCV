
//Contacto: Mensaje + Componente de iconos
import ContactNetworks from "@/components/ContactNetworks";
import FadeIn from "@/components/FadeIn";


export default function Contact() {

    return (
        <div className="flex flex-col py-40 bg-gray-100 items-center min-h-[calc(100vh-120px)]">
            {/* Título principal */}
            <FadeIn animation="fade-down">
                <h1 className="font-serif text-4xl lg:text-6xl">contáctanos</h1>
            </FadeIn>

            {/* Div en flex */}
            <div className="w-40 h-1 bg-yellow-400 mx-auto rounded-full mt-4"></div>

            <FadeIn animation="fade-up" className="w-[95%] lg:w-[50%] text-center justify-around mt-20">
                
                    {/* Mensaje */}
                    <p className="mt-4 text-2xl text-gray-600">
                        Si tienes alguna pregunta, comentario o simplemente quieres saludar, no dudes en ponerte en contacto conmigo.
                        Estoy siempre abierta a nuevas oportunidades y colaboraciones.
                    </p>
                    <ContactNetworks />
            </FadeIn>

        </div>

    )
}