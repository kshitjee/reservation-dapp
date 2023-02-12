export default async function handler(req, res) {
  const profile = JSON.parse(window.localStorage.getItem("profile"));
  
  console.log("here")
  const request = req.body;
  console.log(request.name);
  console.log(request.description);
  console.log(request.ticketTiers);
  console.log(request.quantity);
//   console.log(request.ticketTiers[0].quantity);
//   console.log(request.ticketTiers[0].image);

  // add to database

  for (let i = 0; i < ticketTiers.length; i++) {
    const auction = await auctionSchema.create({
      owner : profile._id,
      expiryDate : request.expiryDate,
      name : request.name + " " + request.ticketTiers[i].name,
      description : request.description ,
      leastBid : request.ticketTiers[i].minimumThreshold,
      quantity : request.ticketTiers[i].quantity,
      minimumThreshold : request.ticketTiers[i].minimumThreshold,
      
      // 
    });
  }

  // store in ipfs
  // contract calls to deploy nft
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
