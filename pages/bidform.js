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

const AuctionsPage = (props) => {
    
    return (
        <div className="container mx-auto">
            {<MakeBid data={props.data}
            />}
        </div>
    );
};

//get server side props
export async function getServerSideProps() {
    const response = await fetch(`http://localhost:5001/api/auctions/`, {
        method: "Get",
        mode: 'cors',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        contentType: "application/json"
    });
    const data = await response.json();
    if (typeof window !== 'undefined') {
        console.log('we are running on the client')
    } else {
        console.log('we are running on the server');
    }


    return {
        props: {
            data
        },
    };
}



export default AuctionsPage;

