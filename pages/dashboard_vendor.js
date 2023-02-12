import React from "react";
import Dashboards from "../components/Dashboard_general";
import Events from "../components/Events"

import { ethers } from 'ethers';
import { useState } from 'react';

const Dashboard = () => {
    const [walletAddress, setWalletAddress] = useState("");
    async function requestAccount() {
        console.log('Requesting account...');

        if (window.ethereum) {
            console.log('detected');

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
                //change wallet address in mongodb
                const profile = JSON.parse(window.localStorage.getItem("profile"));
                const feed = {publicAddress: accounts[0]};
                console.log(profile._id)
                fetch(`http://localhost:5001/api/vendors/${profile._id}/updatepublicaddress`, { method: "POST", body: JSON.stringify(feed), mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, contentType: "application/json" })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    // changeIsError(false)
                    console.log("huha")
                    localStorage.setItem("profile", JSON.stringify(data));
                })
                .catch(e => {
                    console.log(feed)
                    console.log(e)
                    console.log("Error Message Here")
                    //setErrorMessage("Error: Invalid Credentials")
                    //changeIsError(true)
                })

            } catch (error) {
                console.log('Error connecting...');
            }

        } else {
            alert('Meta Mask not detected');
        }
    }

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();

            const provider = new ethers.providers.Web3Provider(window.ethereum);
        }
    }
    return (
        <div className="justify-center my-10 py-10 flex flex-col lg:flex-row">
            <div>
                <button
                    onClick={requestAccount}
                >Request Account</button>
                <h3>Wallet Address: {walletAddress}</h3>
            </div>
            <div className="w-full justify-center lg:w-1/2 p-10 justify-center">
                <h1 className="text-2xl justify-center font-medium px-10">Dashboard</h1>
                <p className="text-gray-600 justify-center px-10">Welcome to your dashboard</p>
                <Dashboards></Dashboards>
            </div>
        </div>
    );
};

export default Dashboard;