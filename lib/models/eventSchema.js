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
  //array of eventtypeschema
  types: {
    type: [mongoose.Schema.ObjectId],
    ref: 'eventType',
    required: true,
  }


});

export default mongoose.model('event', eventSchema);
