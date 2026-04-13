
import Link from 'next/link'  //Link menu


export default function Navbar() {
    return (
        <nav className='h-16'>

            <ul className='flex absolute left-0 top-0 p-4 gap-4'>
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/register">Registrar</Link>
                </li>
            </ul>

            <ul className='flex absolute right-0 top-0 p-4 gap-4'>
                <li className='className="hover:text-purple-600 transition"'>
                    <Link href="/">Inicio</Link>
                </li>
                <li className='className="hover:text-purple-600 transition"'>
                    <Link href="/">Sobre mí</Link>
                </li>
                <li className='className="hover:text-purple-600 transition"'>
                    <Link href="/myProjects">Proyectos</Link>
                </li>
                <li className='className="hover:text-purple-600 transition"'>
                    <Link href="/mySkills">Skills</Link>
                </li>
                <li className='className="hover:text-purple-600 transition"'>
                    <Link href="/contact">Contacto</Link>
                </li>
            </ul>
        </nav>
    )
}