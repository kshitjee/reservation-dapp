// import React, { useState } from 'react';

// const BidForm = ({ event }) => {
//     const [bidAmount, setBidAmount] = useState(0);

//     const handleBidAmountChange = (event) => {
//         setBidAmount(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // submit bid
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-medium mb-4">Place your bid</h2>
//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium text-sm">
//                         Event Description:
//                     </label>
//                     <div>{event.description}</div>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium text-sm">Location:</label>
//                     <div>{event.location}</div>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium text-sm">
//                         Current Owner:
//                     </label>
//                     <div>{event.currentOwner}</div>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium text-sm">
//                         Current Price:
//                     </label>
//                     <div>{event.currentPrice}</div>
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-2 font-medium text-sm">Your Bid:</label>
//                     <input
//                         className="border border-gray-400 p-2 w-full"
//                         type="number"
//                         value={bidAmount}
//                         onChange={handleBidAmountChange}
//                     />
//                 </div>
//                 <button
//                     className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600"
//                     type="submit"
//                 >
//                     Make Bid
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default BidForm;


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';


const MakeBid = ({ data }) => {

    console.log(data)
      
    const [formData, setFormData] = useState({
        bid: 0,
        amount: 0,
        bidder: ""
    });
    const processedOwners = new Set();

    const handleBidChange = (event) => {
        setFormData({ ...formData, bid: event.target.value });
    };

    const handleAmountChange = (event) => {
        setFormData({ ...formData, amount: event.target.value });
    };

    //make the bid as an onclick function that will take the auction id. Bid amount and cost 

    const handleSubmit = (id) => {
        try {
            const profile = JSON.parse(localStorage.getItem("profile"));
       
        
        
        setFormData({ ...formData, bidder: profile._id });
        console.log("here")
        console.log(formData)

        fetch(`http://localhost:5001/api/auctions/${id}/bid`, {
            method: "POST",
            body: JSON.stringify(formData),
            mode: 'cors',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            contentType: "application/json"
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            // changeIsError(false)
            console.log("huha")
        })
        .catch(e => {
            console.log(e)
            console.log("Error Message Here")
            //setErrorMessage("Error: Invalid Credentials")
            //changeIsError(true)
        })
         } catch (e) {
        console.error("Error accessing localStorage:", e);
      }
    };

    
  
      
        


    return (
        <>
        <div>
            {data.map((auction, index) => {
                if (processedOwners.has(auction.owner)) {
                    return null;
                }

                processedOwners.add(auction.owner);
                const ownerAuctions = data.filter(
                    (a) => a.owner === auction.owner
                );

                return (
                    <div key={index} className="flex flex-col w-1/2 mt-16 mx-auto my-10 p-10 border border-gray-400 rounded-lg">
                        <h2 className="text-xl font-medium mb-4 text-center">
                        {auction.vendorName}
                        </h2>
                        <p className="text-sm font-light mb-2">Expiry Date: {auction.expiryDate}</p>
                        <p className="text-sm font-light mb-2">Description: {auction.description}</p>
                        {ownerAuctions.map((auction, subIndex) => (
                            <div key={subIndex} className="flex flex-col my-4">
                                <p className="text-sm font-medium mb-2">Name: {auction.name}</p>
                                <p className="text-sm font-medium mb-2">Least Bid: {auction.least_bid}</p>
                                <p className="text-sm font-medium mb-2">
                                    Current number of bids: {auction.currentNumberofBids}
                                </p>
                                <p className="text-sm font-medium mb-2">Quantity: {auction.quantity}</p>
                                <label className="block mb-2 text-gray-700 font-medium">
                                    Quantity:
                                    <input
                                        onChange={handleAmountChange}
                                        className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
                                        type="text"
                                        name="name"
                                    // value={formData.name}
                                    // onChange={handleInputChange}
                                    />
                                </label>
                                <label className="block mb-2 text-gray-700 font-medium">
                                    Bid:
                                    <input
                                        onChange={handleBidChange}
                                        className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
                                        type="text"
                                        name="name"
                                    // value={formData.name}
                                    // onChange={handleInputChange}
                                    />
                                </label>
                                <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={()=>handleSubmit(auction._id)} >Bid Now</button>
                            </div>
                        ))}
                    </div>
                );


            })}
            </div>
        </>
    );
};

export default MakeBid;
