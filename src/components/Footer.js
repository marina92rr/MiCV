
import Link from 'next/link'  //Link menu
import ContactNetworks from './ContactNetworks'

//Pie de la web, aparecen redes y contacto en iconos
export default function Footer() {
    return (
        <div className='bg-white max-h-15'>
            <ContactNetworks/>
        </div>
    )
}