export default function handler(req, res) {
  const request = req.body;
  console.log(request.name);
  console.log(request.description);
  console.log(request.ticketTiers);
//   console.log(request.ticketTiers[0].quantity);
//   console.log(request.ticketTiers[0].image);
  // add to database

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
