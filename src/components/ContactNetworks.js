
//Contacto redes Sociales
export default function ContactNetworks() {

    //Iconos de enlace que llevan a Linkedin, GitHub, correo y whatsapp
    return (
        <div className="flex flex-wrap my-10 gap-7 justify-center">
            <a href="https://www.linkedin.com/in/marina-ramos-ruiz-a48120314/" alt="Ir a LinkedIn" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin text-amber-600 text-4xl cursor-pointer hover:text-amber-700"></i>
            </a>
            <a href="https://github.com/marina92rr" alt="Ir a GitHub" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github text-amber-600 text-4xl cursor-pointer hover:text-amber-700"></i>
            </a>
            <a href="mailto:marina92.rr@gmail.com" alt="Enviar correo" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-envelope-fill text-amber-600 text-4xl cursor-pointer hover:text-amber-700"></i>
            </a>
            <a href="https://wa.me/34695090351" alt="Escribir por whatsapp" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-whatsapp text-amber-600 text-4xl cursor-pointer hover:text-amber-700"></i>
            </a>

        </div>
    )
}