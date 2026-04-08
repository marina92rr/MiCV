
import Link from 'next/link'  //Link menu


export default function Navbar() {
    return (
        <nav className='h-16 rounded-4xl gap-4 w-200 font-bold text-gray-700 bg-gray-200 shadow'>
            <ul className='flex justify-center items-center gap-4 h-full'>
                <li className='hover:text-gray-950'>
                    <Link href="/">Inicio</Link>
                </li>
                <li className='hover:text-gray-950'>
                    <Link href="/myProjects">Proyectos</Link>
                </li>
                <li className='hover:text-gray-950'>
                    <Link href="/mySkills">Skills</Link>
                </li>
                <li className='hover:text-gray-950'>
                    <Link href="/contact">Contacto</Link>
                </li>
            </ul>
        </nav>
    )
}