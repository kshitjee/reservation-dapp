import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; //npm add react-icons

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const [color, setColor] = useState('black')
    const [textColor, setTextColor] = useState('white')
    const handleNav = () => {
        setNav(!nav);
    }

    useEffect(() => {
        const ChangeColor = () => {
            if (window.scrollY >= 90) {
                setColor('#ffffff');
                setTextColor('#000000')
            } else {
                setColor('transparent');
                setTextColor('#000000');
            }
        }
        window.addEventListener('scroll', ChangeColor);
    }, []);


    return (
        <div style={{ backgroundColor: `${color}` }} className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
            <div className='max-w-[1240px]  m-auto flex justify-between items-center p-4 text-white'>
                <Link href='/'>
                    <h1 style={{ color: `${textColor}` }} className='font-bold text-4xl'>Koraline</h1>
                </Link>
                <ul className='hidden sm:flex'>
                    <li className='p-4'>
                        <Link style={{ color: `${textColor}` }} href='/'>Home</Link>
                    </li>
                    <li className='p-4'>
                        <Link style={{ color: `${textColor}` }} href='/#gallery'>Gallery</Link>
                    </li>
                    <li className='p-4'>
                        <Link style={{ color: `${textColor}` }} href='/Login'>Login</Link>
                    </li>
                    <li className='p-4'>
                        <Link style={{ color: `${textColor}` }} href='/Signup'>Sign up</Link>
                    </li>
                </ul>

                {/*Mobile button*/}
                <div onClick={handleNav} className='block sm:hidden z-10'>
                    {nav ? <AiOutlineClose size={20} style={{ color: `${textColor}` }} /> : <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />}
                </div>
                <div className={
                    nav
                        ? ' sm :hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-cneter ease-in duration-300' :
                        'sm :hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-cneter ease-in duration-300'
                }>
                    <ul>
                        <li className='p-4 text-4xl hover:text-gray-500'>
                            <Link href='/'>Home</Link>
                        </li>
                        <li className='p-4 text-4xl hover:text-gray-500'>
                            <Link href='/#gallery'>Gallery</Link>
                        </li>
                        <li className='p-4 text-4xl hover:text-gray-500'>
                            <Link href='/portfolio'>Work</Link>
                        </li>
                        <li className='p-4 text-4xl hover:text-gray-500'>
                            <Link href='/contact'>Contact</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}
export default Navbar