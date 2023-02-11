import React, { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username} Password: ${password}`);
        // Perform the login here
    };

    return (
        <div className="w-1/3 mx-auto my-20">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded">
                <h2 className="text-lg font-medium mb-4">Login</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
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
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
