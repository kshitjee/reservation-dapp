import asyncHandler from "express-async-handler";
import auctionSchema from "../models/auctionSchema.js";

// @desc    Create a new auction
// @route   POST /api/auction

export const createAuction = asyncHandler(async (req, res) => {
  const { name, description, startingPrice, endTime, seller, image } = await req.body;
  const auction = await auctionSchema.create({
    owner,
    expiryDate,
    name,
    description,
    leastBid,

  });
  if (auction) {
    res.status(201).json({
      _id: auction._id,
      owner: auction.owner,
      name: auction.name,
      description: auction.description,
      expiryDate: auction.expiryDate,
      leastBid: auction.leastBid,
      queue: auction.queue,
      currentNumber: auction.currentNumber,
    });
  } else {
    res.status(400);
    throw new Error("Invalid auction data");
  }
}
);

// @desc    Get all auctions
// @route   GET /api/auction

export const getAuctions = asyncHandler(async (req, res) => {
  const auctions = await auctionSchema.find({});
  res.json(auctions);
}
);

// @desc    Get a auction by id
// @route   GET /api/auction/:id

export const getAuctionById = asyncHandler(async (req, res) => {
  const auction = await auctionSchema.findById(req.params.id);
  if (auction) {
    res.json(auction);
  } else {
    res.status(404);
    throw new Error("Auction not found");
  }
}
);