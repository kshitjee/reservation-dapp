import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  // auction vendor id
  owner: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  queue: {
    type: Array,
    default: [],
  },
  // The least bid you need to get in the queue
  leastBid: {
    type: Number,
    required: true,
  },
  currentNumberOfBids: {
    type: Number,
    default: 0,
  },

});

export default mongoose.model("Auction", auctionSchema);