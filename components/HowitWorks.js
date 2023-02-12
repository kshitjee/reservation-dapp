import React from "react";
import { css, keyframes } from '@emotion/react'

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
        <div css={css`
      animation: 1s ${fadeIn} ease-out;
    `}>
            <section className=" py-12 custom-img">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white">Features</h2>
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full md:w-1/3 px-6 mb-12">
                            <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Decentralized</h3>
                                <p className="text-gray-700 mb-4">
                                    The event based decentralized auction is built on a decentralized platform, ensuring maximum security and transparency for users.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    Secure and Transparent
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-6 mb-12">
                            <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Easy to Use</h3>
                                <p className="text-gray-700 mb-4">
                                    Our event based decentralized auction application is user-friendly and easy to use. You can participate in an auction with just a few clicks.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    User-Friendly Interface
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-6 mb-12">
                            <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
                                <h3 className="text-xl font-bold mb-4">Event Based</h3>
                                <p className="text-gray-700 mb-4">
                                    Our event based decentralized auction is designed specifically for event based auctions, ensuring a seamless and efficient experience for users.
                                </p>
                                <p className="text-gray-700 mb-4">
                                    <i className="fas fa-check text-green-500 mr-2"></i>
                                    Event Based Auctions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default IntroSlide;






