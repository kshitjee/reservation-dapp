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
    if (!auction.minimumThreshold) {
      res.status(400);
      throw new Error("Auction validation failed: minimumThreshold field is required");
    }
    const { bidder, bid, amount } = req.body;
    if (amount > auction.quantity - auction.queue.length) {
      res.status(400);
      throw new Error("Amount is greater than the remaining number of items");
    }
    for (let i = 0; i < amount; i++) {
      if (bid < auction.minimumThreshold) {
        res.status(400);
        throw new Error("Bid is too low");
      }
      else if (auction.queue.length < auction.quantity) {
        auction.queue.push({ bidder, bid });
        auction.leastBid = Math.min(auction.leastBid, bid);
        auction.currentNumberOfBids ++;
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
      }
      else {
        res.status(400);
        throw new Error("Bid is too low");
      }
    }
    // Only save the auction data if there were no errors during the loop
    auction.save();
    res.json(auction);
  } else {
    res.status(404);
    throw new Error("Auction not found");
  }
});

// @desc settle an auction
// @route POST /api/auction/:id/settle

export const settleAuction = asyncHandler(async (req, res) => {
  const auction = await auctionSchema.findById(req.params.id);
  if (auction) {
    
    for (let i = 0; i < auction.queue.length; i++) {
      //function to send email to the winner
      //function to transfer funds
      //function to create a new ticket for the winner that'll be stored on their dashboard later

    }
    auction.save();
    res.json(auction);
  } else {
    res.status(404);
    throw new Error("Auction not found");
  }
}
);
