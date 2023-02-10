// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    // The address that owns the contract
    address owner;

    // The NFT that is up for auction
    uint256 tokenId;

    // The current highest bid
    uint256 highestBid;

    // The address of the current highest bidder
    address payable highestBidder;

    // The auction end time
    uint256 auctionEndTime;

    // Events
    event NewBid(uint256 bid, address bidder);
    event AuctionEnd(address winner, uint256 winningBid);

    // Constructor function to initialize the auction
    constructor(uint256 _tokenId, uint256 _auctionEndTime) public {
        owner = msg.sender;
        tokenId = _tokenId;
        auctionEndTime = _auctionEndTime;
    }

    // Bid on the NFT
    function bid(uint256 _bid) public payable {
        require(msg.value > highestBid, "Bid must be higher than the current highest bid");
        require(block.timestamp < auctionEndTime, "Auction has already ended");

        highestBid = _bid;
        highestBidder = payable(msg.sender);

        emit NewBid(highestBid, highestBidder);
    }

    // End the auction and award the NFT to the highest bidder
    function endAuction() public payable {
        require(block.timestamp >= auctionEndTime, "Auction has not ended yet");
        require(msg.sender == owner, "Only the owner can end the auction");

        highestBidder.transfer(msg.value);

        emit AuctionEnd(highestBidder, highestBid);
    }
}
