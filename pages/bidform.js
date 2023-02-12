// import React, { useState, useEffect } from 'react';
// import MakeBid from '../components/Makebid';
// import _ from 'lodash';
// //get all the data from the auction and set a const to it




// // function BidPage() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         async function fetchData() {
//             const response = await fetch(`http://localhost:5001/api/auctions/`, {
//                 method: "Get",
//                 mode: 'cors',
//                 headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//                 contentType: "application/json"
//             });
//             const data = await response.json();
//             setData(data);
//         }
//         fetchData();
//     }, []);
import React, { useState, useEffect } from 'react';
import MakeBid from '../components/MakeBid';
import ethers from 'ethers';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const AuctionsPage = (props) => {
    
    return (
        <>
            <header>
                <nav className="flex items-center justify-between p-6 bg-black fixed w-full top-0">
                    <Link href="/"><h2 className="font-bold text-4xl text-white">Koraline</h2></Link>
                    <Link href="/" className=" text-white py-2 px-4 rounded-full">Sign Out</Link>
                </nav>
            </header>
            <div className="container mx-auto mt-24">
            {<MakeBid data={props.data}
            />}
            </div>
        </>
    );
};

const ownerName = async (owner) => {
    try {
      const response = await fetch(`http://localhost:5001/api/vendors/${owner}`, {
        method: "GET",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error(error);
      return 'Error';
    }
  };

//get server side props
export async function getServerSideProps() {
    const response = await fetch(`http://localhost:5001/api/auctions/`, {
        method: "Get",
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        contentType: "application/json"
    });
    
    let data = await response.json();
    data = await Promise.all(data.map(async (auction) => {
        const vendorName = await ownerName(auction.owner);
        return {...auction, vendorName};
      }));
      
      


    return {
        props: {
            data
        },
    };
}



export default AuctionsPage;

