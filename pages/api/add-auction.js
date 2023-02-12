import { create } from "ipfs-http-client";
const fs = require("fs");
const pinataSDK = require("@pinata/sdk");

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64"
    )}`,
  },
});

export default async function handler(req, res) {
  var pinata = new pinataSDK(
    process.env.PINATA_API_KEY,
    process.env.PINATA_API_SECRET_KEY
  );
  pinata
    .testAuthentication()
    .then((result) => {
      //handle successful authentication here
      console.log(result);
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
  const request = req.body;
  console.log(request);
  const ticketTiers = request.ticketTiers;
  // console.log(request.ticketTiers[0].imageBuffer.data);

  const tokenMetadatas = [];
  const tokenIds = [];
  const urls = [];

  for (let i = 0; i < ticketTiers.length; i++) {
    const result = await ipfs.add(ticketTiers[i]["imageBuffer"]["data"]);
    const url = "https://gateway.ipfs.io/ipfs/" + result.path; // need to send as response
    console.log(url);
    urls.push(url);
    let meta = {
      name: ticketTiers[i].name,
      initialQty: ticketTiers[i].quantity,
      image: url,
    };
    tokenMetadatas.push(meta);

    meta = JSON.stringify(meta);
    fs.writeFile(`tempFiles/${i + 1}.json`, meta, (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });
    tokenIds.push(i + 1);
  }

  // UPLOAD NFT METADATA TO IPFS VIA PINATA
  let baseMetadataURI = "https://gateway.pinata.cloud/ipfs/";
  const appDir = __dirname.substring(0, __dirname.length - 22);
  const sourcePath = appDir + "tempFiles/";
  console.log("hi");
  const cid = await pinata.pinFromFS(sourcePath);
  console.log("hi");
  baseMetadataURI += cid.IpfsHash;
  console.log(baseMetadataURI);

  const response = {
    urls: urls,
    baseMetadataURI: baseMetadataURI,
  };

  res.status(200).json(response);
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
