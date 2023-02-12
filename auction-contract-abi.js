export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_eventImplementation",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "Auction__BidTooLow", type: "error" },
  { inputs: [], name: "Auction__NotEnoughFunds", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "idsLength", type: "uint256" },
      { internalType: "uint256", name: "suppliesLength", type: "uint256" },
    ],
    name: "Auction__TokenIdsDoNotMatchTokenSupplies",
    type: "error",
  },
  { inputs: [], name: "Auction__UnauthorizedCaller", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "eventAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "baseMetaDataURI",
        type: "string",
      },
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "address", name: "organizer", type: "address" },
          { internalType: "string", name: "baseMetadataURI", type: "string" },
          { internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
          {
            internalType: "uint256[]",
            name: "tokenSupplies",
            type: "uint256[]",
          },
          { internalType: "uint256[]", name: "tokenStatus", type: "uint256[]" },
          { internalType: "uint256[]", name: "minBids", type: "uint256[]" },
        ],
        indexed: false,
        internalType: "struct Auction.Event",
        name: "event0",
        type: "tuple",
      },
    ],
    name: "EventListed",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_baseMetadataURI", type: "string" },
      { internalType: "uint256[]", name: "_tokenIds", type: "uint256[]" },
      { internalType: "uint256[]", name: "_tokenSupplies", type: "uint256[]" },
      { internalType: "uint256[]", name: "_tokenStatus", type: "uint256[]" },
      { internalType: "uint256[]", name: "_minBids", type: "uint256[]" },
    ],
    name: "createEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_eventAddress", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "placeBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_eventAddress", type: "address" },
    ],
    name: "settleAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_eventAddress", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
      { internalType: "uint256", name: "_newBid", type: "uint256" },
    ],
    name: "updateMinBid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
