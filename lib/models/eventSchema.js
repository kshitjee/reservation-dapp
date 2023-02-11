import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: [true, 'Please add a public address'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  //array of strings which are all ids to the event types
  types: {
    type: [String],
    required: true,
  }


});

export default mongoose.model('event', eventSchema);
