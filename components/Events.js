import React from 'react';

const Events = ({ events }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
                <div key={event.id} className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="text-xl font-medium">{event.venue}</h3>
                    <p className="text-gray-700 mt-2">{event.description}</p>
                    <p className="text-gray-700 mt-2">Location: {event.location}</p>
                </div>
            ))}
        </div>
    );
};

export default Events;
