import mongoose from 'mongoose';

const eventTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  auctionOnly: {
    type: Boolean,
    required: true,
  }
});

export default mongoose.model('eventType', eventTypeSchema);