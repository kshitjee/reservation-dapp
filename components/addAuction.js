import React, { useState } from "react";
import Link from "next/link";
const AddAuction = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        ticketTiers: [
            {
                name: "",
                quantity: 0,
                image: null
            }
        ]
    });

    const handleInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleTierTicketChange = (event, index, type) => {
        const newTicketTiers = [...formData.ticketTiers];
        if (type === "text") {
            newTicketTiers[index][event.target.name] = event.target.value;
        } else if (type === "image") {
            newTicketTiers[index]["image"] = event.target.files[0];
        }
        setFormData({ ...formData, ticketTiers: newTicketTiers });
    };

    const handleAddTier = () => {
        setFormData({
            ...formData,
            ticketTiers: [
                ...formData.ticketTiers,
                {
                    name: "",
                    quantity: 0,
                    image: null
                }
            ]
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <>
            <nav className="flex items-center justify-between p-6 bg-black fixed w-full top-0">
                <Link href="/"><h2 className="font-bold text-4xl text-white">Koraline</h2></Link>
                <Link href="/Login" className=" text-white py-2 px-4 rounded-full">Login</Link>
            </nav>

        <div className="bg-gray-200 min-h-screen">
            <nav className="bg-white p-6">
                <div className="container mx-auto">
                    <h1 className="text-xl font-bold">Auction Form</h1>
                </div>
            </nav>
            <div className="container mx-auto p-10">
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-6">
                        <div className="w-1/2 mr-2">
                            <label
                                className="block font-medium mb-2 text-gray-700"
                                htmlFor="name"
                            >
                                Name:
                            </label>
                            <input
                                className="w-full border border-gray-400 p-2"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <label
                                className="block font-medium mb-2 text-gray-700"
                                htmlFor="description"
                            >
                                Description:
                            </label>
                            <input
                                className="w-full border border-gray-400 p-2"
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {formData.ticketTiers.map((tier, index) => (
                        <div key={index} className="my-4">
                            <h3 className="text-gray-700 font-medium mb-2">
                                Ticket Tier {index + 1}
                            </h3>
                            <div className="flex my-4">
                                <label className="block w-full md:w-3/4">
                                    Tier Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={tier.name}
                                        onChange={(event) =>
                                            handleTierTicketChange(event, index, "text")
                                        }
                                        className="border border-gray-400 rounded p-2 w-full"
                                    />
                                </label>
                                <label className="block w-full md:w-1/4">
                                    Quantity Available:
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={tier.quantity}
                                        onChange={(event) =>
                                            handleTierTicketChange(event, index, "text")
                                        }
                                        className="border border-gray-400 rounded p-2 w-full"
                                    />
                                </label>
                            </div>
                            <div className="flex my-4">
                                <label className="block w-full">
                                    Image:
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={(event) =>
                                            handleTierTicketChange(event, index, "image")
                                        }
                                        className="border border-gray-400 rounded p-2 w-full"
                                    />
                                </label>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between ">
                        <button
                            type="button"
                            onClick={handleAddTier}
                            className="bg-gray-300 py-2 px-4 mx-4 rounded-lg mr-4"
                        >
                            Add Ticket Tier
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div >
            </div >
        </>
    );
};

export default AddAuction;


