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

const MakeBid = ({ data }) => {
    const processedOwners = new Set();

    return (
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
                    <div key={index} className="flex flex-col w-1/2 mx-auto my-10 p-4 border border-gray-400 rounded-lg">
                        <h2 className="text-xl font-medium mb-4 text-center">{auction.owner}</h2>
                        <p className="text-sm font-light mb-2">Expiry Date: {auction.expiry_date}</p>
                        <p className="text-sm font-light mb-2">Description: {auction.description}</p>
                        {ownerAuctions.map((auction, subIndex) => (
                            <div key={subIndex} className="flex flex-col my-4">
                                <p className="text-sm font-medium mb-2">Name: {auction.name}</p>
                                <p className="text-sm font-medium mb-2">Least Bid: {auction.least_bid}</p>
                                <p className="text-sm font-medium mb-2">
                                    Current number of bids: {auction.current_number_of_bids}
                                </p>
                                <p className="text-sm font-medium mb-2">Quantity: {auction.quantity}</p>
                                <label className="block mb-2 text-gray-700 font-medium">
                                    Quantity:
                                    <input
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
                                        className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
                                        type="text"
                                        name="name"
                                    // value={formData.name}
                                    // onChange={handleInputChange}
                                    />
                                </label>
                                <button className="bg-blue-500 text-white p-2 rounded-lg">Bid Now</button>
                            </div>
                        ))}
                    </div>
                );


            })}
        </div>
    );
};

export default MakeBid;
