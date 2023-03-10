import React, { useState } from "react";
//import auction schema
import auctionSchema from "../lib/models/auctionSchema.js";
import Link from "next/link.js";

function AuctionForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ticketTiers: [
      {
        name: "",
        quantity: "",
        auctionOnly: false,
        image: null,
        imageBuffer: null,
        minimumThreshold: 0,
      },
    ],
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleTierTicketChange(event, index, type) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const newTiers = [...prevState.ticketTiers];
      if (type === "image") {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = () => {
          const newImage = reader.result;
          const imageBuffer = Buffer.from(newImage.split(",")[1], "base64");
          newTiers[index].imageBuffer = imageBuffer;
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      } else {
        newTiers[index][name] = value;
      }
      return {
        ...prevState,
        ticketTiers: newTiers,
      };
    });
  }

  function handleAddTier() {
    setFormData((prevState) => ({
      ...prevState,
      ticketTiers: [
        ...prevState.ticketTiers,
        {
          name: "",
          quantity: "",
          auctionOnly: false,
          image: null,
          imageBuffer: null,
          minimumThreshold: 0,
        },
      ],
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/add-auction", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(formData);

    const profile = JSON.parse(window.localStorage.getItem("profile"));

    console.log("here");
    const request = formData;
    console.log(request.name);
    console.log(request.description);
    console.log(request.ticketTiers);
    console.log(request.quantity);
    const ticketTiers = request.ticketTiers;
    const tierTokenMetaData = [];
    let i = 0;
    const tokenIds = [];

    ticketTiers.map(async (ticketTier, index) => {
      const thisTier = {
        owner: profile._id,
        expiryDate: request.expiryDate,
        name: request.name + " " + request.ticketTiers[index].name,
        description: request.description,
        leastBid: request.ticketTiers[index].minimumThreshold,
        quantity: request.ticketTiers[index].quantity,
        minimumThreshold: request.ticketTiers[index].minimumThreshold,
      };

      // Update Database with new auction data
      fetch(`http://localhost:5001/api/auctions/createauction`, { method: "POST", body: JSON.stringify(thisTier), mode: 'cors', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, contentType: "application/json" })
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
      i++;
    });
  };

  const expiryDate = formData.expiryDate
    ? new Date(formData.expiryDate).toISOString().substr(0, 10)
    : "";
  const handleInputChangeDate = (event) => {
    const { name, value } = event.target;

    if (name === "expiryDate") {
      setFormData({
        ...formData,
        [name]: new Date(value).getTime(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between p-6 bg-black fixed w-full top-0">
        <Link href="/"><h2 className="font-bold text-4xl text-white">Koraline</h2></Link>
        <Link href="/" className=" text-white py-2 px-4 rounded-full">Sign out</Link>
      </nav>
      <div className="flex flex-col items-center justify-center h-1/3 py-10 w-full mt-24">
      <form
        className="w-full max-w-lg p-10 bg-white rounded-lg shadow-xl"
        onSubmit={handleSubmit}
      >
        <label className="block mb-2 text-gray-700 font-medium">
          Name:
          <input
            className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2 text-gray-700 font-medium">
          Description:
          <input
            className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>

        <label className="block mb-2 text-gray-700 font-medium">
          Expiry Date:
          <input
            className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
            type="date"
            name="expiryDate"
            value={expiryDate}
            onChange={handleInputChange}
          />
        </label>

        {formData.ticketTiers.map((tier, index) => (
          <div key={index} className="mb-10">
            <h3 className="text-lg font-medium mb-2">
              Ticket Tier {index + 1}
            </h3>
            <label className="block mb-2 text-gray-700 font-medium">
              Tier Name:
              <input
                className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
                type="text"
                name="name"
                value={tier.name}
                onChange={(event) =>
                  handleTierTicketChange(event, index, "text")
                }
              />
            </label>
            <label className="block mb-2 text-gray-700 font-medium">
              Quantity Available:
              <input
                className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
                type="number"
                name="quantity"
                value={tier.quantity}
                onChange={(event) =>
                  handleTierTicketChange(event, index, "text")
                }
              />
            </label>
            <label className="block mb-2 text-gray-700 font-medium">
              Minimum Threshold:
              <input
                className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
                type="number"
                name="minimumThreshold"
                value={tier.minimumThreshold}
                onChange={(event) =>
                  handleTierTicketChange(event, index, "text")
                }
              />
            </label>

            {/* <label className="block mb-2 text-gray-700 font-medium">
              Auction Only:
              <input
                className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
                type="checkbox"
                name="auctionOnly"
                checked={tier.auctionOnly}
                onChange={(event) =>
                  handleTierTicketChange(event, index, "text")
                }
              />
            </label> */}
            <label className="block mb-2 text-gray-700 font-medium">
              Image:
              <input
                className="w-full mt-2 p-2 border border-gray-400 rounded-lg"
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) =>
                  handleTierTicketChange(event, index, "image")
                }
              />
            </label>
          </div>
        ))}
        <div className="flex justify-between mt-8">
          <button
            className="px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white"
            type="button"
            onClick={handleAddTier}
          >
            Add Ticket Tier
          </button>

          <button
            className="px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </>
  );
}

export default AuctionForm;
