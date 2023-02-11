//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

/* COLLECTION INTERFACE */
interface IEvent {
  function initialize(address _organizer, address _auctionContract, string memory _baseMetadataURI) external;

  function mint(
    address _to,
    uint256 _id,
    uint256 _amount
  ) external;
}