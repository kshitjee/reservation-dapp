import React from "react";
import { ethers } from 'ethers';
import { useState } from 'react';

//const user = JSON.parse(localStorage.getItem("profile"))
const Dashboard = () => {

    const [walletAddress, setWalletAddress] = useState("");
    async function requestAccount() {
        console.log('Requesting account...');
    
        if(window.ethereum) {
          console.log('detected');
    
          try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            setWalletAddress(accounts[0]);
          } catch (error) {
            console.log('Error connecting...');
          }
    
        } else {
          alert('Meta Mask not detected');
        }
      }
    
      async function connectWallet() {
        if(typeof window.ethereum !== 'undefined') {
          await requestAccount();
    
          const provider = new ethers.providers.Web3Provider(window.ethereum);
        }
      }
    return (
        <div className="flex h-screen justify-center items-center">

            <header className="App-header">
                    <button
                    
                    onClick={requestAccount}
                    
                    >Request Account</button>
                    <h3>Wallet Address: {walletAddress}</h3>
                </header>

            <div className="w-3/4 bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Auction Dashboard</h2>
                <div className="mb-4">
                    <p className="font-bold">Welcome, [user.name]</p>
                    <p className="text-gray-600">
                        Here you can manage your auctions, view bids, and more.
                    </p>
                </div>
                <div className="flex">
                    <div className="w-1/2 p-2">
                        <div className="bg-gray-300 p-4 rounded-lg">
                            <p className="font-bold mb-2">Active Auctions</p>
                            <p className="text-3xl text-center font-bold">[Number]</p>
                        </div>
                    </div>
                    <div className="w-1/2 p-2">
                        <div className="bg-gray-300 p-4 rounded-lg">
                            <p className="font-bold mb-2">Total Bids</p>
                            <p className="text-3xl text-center font-bold">[Number]</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="font-bold mb-2">Recent Activity</p>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2 font-bold">Auction</th>
                                <th className="border p-2 font-bold">Bidder</th>
                                <th className="border p-2 font-bold">Amount</th>
                                <th className="border p-2 font-bold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">[Auction Title]</td>
                                <td className="border p-2">[Bidder Name]</td>
                                <td className="border p-2">[Amount]</td>
                                <td className="border p-2">[Date]</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    };

export default Dashboard;
