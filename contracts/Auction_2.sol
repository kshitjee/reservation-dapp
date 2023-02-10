// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Auction_2 is ERC1155 {
    // The address that owns the contract
    address owner;

    // The ERC-1155 NFTs that are up for auction
    uint256[] nftIds;

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
    constructor(uint256[] memory _nftIds, uint256 _auctionEndTime) {
        owner = msg.sender;
        nftIds = _nftIds;
        auctionEndTime = _auctionEndTime;
    }

    // Bid on the ERC-1155 NFT
    function bid(uint256 _bid) public payable {
        require(msg.value > highestBid, "Bid must be higher than the current highest bid");
        require(block.timestamp < auctionEndTime, "Auction has already ended");

        highestBid = _bid;
        highestBidder = payable(msg.sender);

        emit NewBid(highestBid, highestBidder);
    }

    // End the auction and award the ERC-1155 NFT to the highest bidder
    function endAuction() public {
        require(block.timestamp >= auctionEndTime, "Auction has not ended yet");
        require(msg.sender == owner, "Only the owner can end the auction");

        for (uint256 i = 0; i < nftIds.length; i++) {
            _safeTransferFrom(owner, highestBidder, nftIds[i], 0, "");
        }

        highestBidder.transfer(highestBid);

        emit AuctionEnd(highestBidder, highestBid);
    }
}
