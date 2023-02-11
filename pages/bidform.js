import React from 'react';
import BidForm from '../components/Makebid';

function BidPage() {
    const sampleData = {
        eventDescription: 'Auction for a rare painting',
        location: 'New York',
        currentOwner: 'John Doe',
        currentPrice: 10000
    };

    return (
        <div className="container mx-auto p-6">
            <BidForm event={sampleData} />
        </div>
    );
}

export default BidPage;

