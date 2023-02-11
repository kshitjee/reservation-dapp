import React from "react";
import Dashboards from "../components/Dashboard_general";
import Events from "../components/Events"





const Dashboard = () => {
    const events = [
        {
            id: 1,
            venue: 'Concert at Central Park',
            description: 'A live concert featuring top artists',
            location: 'Central Park, New York'
        },
        {
            id: 2,
            venue: 'Food Festival',
            description: 'Taste the best food from around the world',
            location: 'Battery Park, New York'
        }
    ];

    return (
        <div className="justify-center my-10 py-10 flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-10">
                <h1 className="text-2xl justify-center font-medium p-10 ">Ongoing Events</h1>
                <Events events={events} />
                <Events events={events} />

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
