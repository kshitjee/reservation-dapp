import asyncHandler from "express-async-handler";
import ticketSchema from "../models/ticketSchema";

//create ticket
export const createTicket = asyncHandler(async (req, res) => {
  const {auction, owner, tokenURI, name, quantity} = await req.body;
  const ticket = await ticketSchema.create({
    auction,
    owner,
    tokenURI,
    name,
    quantity
  });
  if (ticket) {
    res.status(201).json({
      _id: ticket._id,
      auction: ticket.auction,
      owner: ticket.owner,
      tokenURI: ticket.tokenURI,
      name: ticket.name,
      quantity: ticket.quantity
    });
  }
  else {
    res.status(400);
    throw new Error("Invalid ticket data");
  }
}
);