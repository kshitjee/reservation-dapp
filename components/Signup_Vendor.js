import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";

const VendorSignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [userData, setUserData] = useState({ name: "", email: "", password: "", address: "" })


    const handleNameChange = (event) => {
        setName(event.target.value);
        setUserData({ ...userData, name: event.target.value });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setUserData({ ...userData, email: event.target.value });
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setUserData({ ...userData, password: event.target.value });
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
        setUserData({ ...userData, address: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(

            `Name: ${name} Email: ${email} Password: ${password} Address: ${address}`
        );
        fetch("http://localhost:5001/api/vendors/signup", { method: "POST", body: JSON.stringify(userData), mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, contentType: "application/json" })
            .then(res => {
                return res.json()
            })
            .then(data => {
                // changeIsError(false)
                console.log("huha")
                localStorage.setItem("profile", JSON.stringify(data));
                Router.push('/addAuction');
            })
            .catch(e => {
                console.log(userData)
                console.log(e)
                console.log("Error Message Here")
                //setErrorMessage("Error: Invalid Credentials")
                //changeIsError(true)
            })
    };

    return (
        <div className="w-1/3 mx-auto my-20">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded">
                <h2 className="text-lg font-medium mb-4">Sign Up as Vendor</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full border border-gray-400 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full border border-gray-400 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full border border-gray-400 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block font-medium mb-2">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={handleAddressChange}
                        className="w-full border border-gray-400 p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
            <div>
                <Link href="/signup" className="font-medium underline">Signup as User
                </Link>
            </div>
        </div>

    );
};

export default VendorSignupForm;







