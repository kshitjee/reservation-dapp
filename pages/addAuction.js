import React, { useState } from "react";

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
      body: data,
    });

  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: "100px" }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        {formData.ticketTiers.map((tier, index) => (
          <div key={index}>
            <h3>Ticket Tier {index + 1}</h3>
            <label>
              Tier Name:
              <input
                type="text"
                name="name"
                value={tier.name}
                onChange={(event) =>
                  handleTierTicketChange(event, index, "text")
                }
              />
            </label>
            <label>
              Quantity Available:
              <input
                type="number"
                name="quantity"
                value={tier.quantity}
                onChange={(event) =>
                  handleTierTicketChange(event, index, "text")
                }
              />
            </label>
            <label>
              Auction Only:
              <input
                type="checkbox"
                name="auctionOnly"
                checked={tier.auctionOnly}
                onChange={(event) =>
                  handleTierTicketChange(event, index, "text")
                }
              />
            </label>
            <label>
              Image:
              <input
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
        <button type="button" onClick={handleAddTier}>
          Add Ticket Tier
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AuctionForm;
