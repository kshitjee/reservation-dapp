import React, { useState, useEffect } from 'react';
import BidForm from '../components/Makebid';

//get all the data from the auction and set a const to it




function BidPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5001/api/auctions/`, {
                method: "Get",
                mode: 'cors',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                contentType: "application/json"
            });
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);


    console.log(data)
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

