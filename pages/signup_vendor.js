import React from 'react'
import Signup from '../components/Signup_Vendor'
import Link from 'next/link'


const signup = () => {
    return (
        <>
            <nav className="flex items-center justify-between p-6 bg-black fixed w-full top-0">
                <h2 className="font-bold text-4xl text-white">Koraline</h2>
                <Link href="/Signup" className=" text-white py-2 px-4 rounded-full">Sign up</Link>
            </nav>
            <div className='custom-img'>
            <Signup />
            </div>
        </>
    )
}

export default Signup