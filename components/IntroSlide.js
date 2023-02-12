
import React from 'react'
import { css, keyframes } from '@emotion/react'
import Link from 'next/link'

const fadeIn = keyframes`
  from {
    opacity: 0;
}

  to {
    opacity: 1;
}
`


const IntroSlide = () => {
    return (

        <div>
            <section className="bg-cover bg-center h-screen">
                <div className="h-full flex items-center justify-center">
                    <div className="w-full max-w-md text-center">
                        <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">
                            Koraline
                        </h1>
                        <p className="text-white text-xl mb-8">
                            A new way to experience auctions like never before.
                        </p>
                        <Link href="/Login" className="inline-block bg-white px-10 py-3 mx-3 rounded-full text-black hover:bg-gray-200">
                            Login
                        </Link>
                        <Link href="/Signup" className="inline-block bg-white px-10 py-3 mx-3 rounded-full text-black hover:bg-gray-200">
                            Signup
                        </Link>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default IntroSlide;



