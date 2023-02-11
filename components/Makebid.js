import React, { useState } from 'react';

const BidForm = ({ event }) => {
    const [bidAmount, setBidAmount] = useState(0);

    const handleBidAmountChange = (event) => {
        setBidAmount(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // submit bid
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-medium mb-4">Place your bid</h2>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-sm">
                        Event Description:
                    </label>
                    <div>{event.description}</div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-sm">Location:</label>
                    <div>{event.location}</div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-sm">
                        Current Owner:
                    </label>
                    <div>{event.currentOwner}</div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-sm">
                        Current Price:
                    </label>
                    <div>{event.currentPrice}</div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium text-sm">Your Bid:</label>
                    <input
                        className="border border-gray-400 p-2 w-full"
                        type="number"
                        value={bidAmount}
                        onChange={handleBidAmountChange}
                    />
                </div>
                <button
                    className="bg-indigo-500 text-white py-2 px-4 rounded-full hover:bg-indigo-600"
                    type="submit"
                >
                    Make Bid
                </button>
            </div>
        </form>
    );
};

export default BidForm;
