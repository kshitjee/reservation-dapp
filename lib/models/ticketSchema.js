import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ticketSchema = new Schema({
  //event 
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  
});

export default mongoose.model('Ticket', ticketSchema);