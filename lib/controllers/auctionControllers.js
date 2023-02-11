import asyncHandler from "express-async-handler";
import auctionSchema from "../models/auctionSchema.js";

// @desc    Create a new auction
// @route   POST /api/auction

export const createAuction = asyncHandler(async (req, res) => {
  const { owner, expiryDate, name, description, leastBid, quantity, minimumThreshold } = await req.body;
  const auction = await auctionSchema.create({
    owner,
    expiryDate,
    name,
    description,
    leastBid,
    quantity,
    minimumThreshold

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
      quantity: auction.quantity,
      minimumThreshold: auction.minimumThreshold,
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

// @desc Process a bid
// @route POST /api/auction/:id/bid

export const processBid = asyncHandler(async (req, res) => {
  const auction = await auctionSchema.findById(req.params.id);
  if (auction) {
    const { bidder, bid } = await req.body;
    //if the queue size is less than quantity, add to queue. Note that queue is just an array in the form of {bidder, bid}
    //else, check if bid is greater than leastBid, if so, find the lowest bid and replace it
    if (bid < auction.minimumThreshold) {
      res.status(400);
      throw new Error("Bid is too low");
    }
    else if (auction.queue.length < auction.quantity) {
      auction.queue.push({ bidder, bid });
      auction.leastBid = Math.min(auction.leastBid, bid);
      auction.currentNumberOfBids ++;
      auction.save();

      res.json(auction);
    }
    else if (bid > auction.leastBid) {
      let lowestBid = auction.queue[0];
      let lowestBidIndex = 0;
      for (let i = 1; i < auction.queue.length; i++) {
        if (auction.queue[i].bid < lowestBid.bid) {
          lowestBid = auction.queue[i];
          lowestBidIndex = i;
        }
      }
      auction.queue[lowestBidIndex] = { bidder, bid };
      auction.leastBid = Math.min(auction.leastBid, bid);
      auction.save();
      res.json(auction);
    }
    else {
      res.status(400);
      throw new Error("Bid is too low");
    }

  } else {
    res.status(404);
    throw new Error("Auction not found");
  }
}
);