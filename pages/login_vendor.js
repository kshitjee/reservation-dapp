import React from 'react'
import VendorLogin from '../components/Login_Vendor'
import Link from 'next/link'

const login = () => {
    return (
        <>
            <header>
                <nav className="flex items-center justify-between p-6 bg-black fixed w-full top-0">
                    <Link href="/"><h2 className="font-bold text-4xl text-white">Koraline</h2></Link>
                    <Link href="/Signup" className=" text-white py-2 px-4 rounded-full">Sign up</Link>
                </nav>
            </header>
            <div className='custom-img'>
            <VendorLogin />
            </div>
        </>
    )
}

export default login