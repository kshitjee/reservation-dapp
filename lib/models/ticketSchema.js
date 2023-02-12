//only for winners
var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
  // auction id
  auction: {
    type: String,
    required: true,
  },
  // ticket owner id
  owner: {
    type: String,
    required: true,
  },
  //token uri
  tokenURI: {
    type: String,
    required: true,
  },
  //name of the ticket
  name: {
    type: String,
    required: true,
  },
  //quantity of tickets
  quantity: {
    type: Number,
    required: true,
  },
}
);

module.exports = mongoose.model('Ticket', ticketSchema);