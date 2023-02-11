import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";


const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userdata, setUserdata] = useState([
        {
            email: "",
            password: "",
        },
    ]);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setUserdata({
            ...userdata,
            email: event.target.value,
        });
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setUserdata({
            ...userdata,
            password: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Email: ${email} Password: ${password}`);
        fetch("http://localhost:5001/api/generalusers/login", { method: "POST", body: JSON.stringify(userdata), mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, contentType: "application/json" })
            .then(res => {
                return res.json()
            })
            .then(data => {
                // changeIsError(false)
                console.log("huha")
                localStorage.setItem("profile", JSON.stringify(data));
                Router.push('/');
            })
            .catch(e => {
                console.log(userdata)
                console.log(e)
                console.log("Error Message Here")
                //setErrorMessage("Error: Invalid Credentials")
                //changeIsError(true)
            })
    };

    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url()` }}>
            <div className="flex h-screen">
                <div className="m-auto w-3/4 lg:w-1/2">
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-medium mb-4">Login</h2>
                        <form onSubmit={handleSubmit} className="">
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
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                    <div className="text-center my-4">
                        <Link href="/vendor-login" className="font-medium underline">Login as Vendor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
