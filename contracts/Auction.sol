//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* imports */
import "@openzeppelin/contracts/proxy/Clones.sol";
import "../interfaces/IEvent.sol";

/* errors */
error Auction__TokenIdsDoNotMatchTokenSupplies(
  uint256 idsLength,
  uint256 suppliesLength
);
error Auction__OnlyEventOwnerCanCall(address caller);
error Auction__BidTooLow();
error Auction__NotEnoughFunds();
error Auction__UnauthorizedCaller();

contract Auction {
  /* structs and enums */
  struct Event {
    string name;
    address organizer;
    string baseMetadataURI;
    uint[] tokenIds;
    uint[] tokenSupplies;
    uint[] tokenStatus;
    uint[] minBids;
  }

  /*  state variables */
  address immutable eventImplementation;
  mapping(address => Event) addrToEvent;
  mapping(address => address) addrToOrg;
  mapping(address => uint) addrToNoOfTokenTypes;
  mapping(address => mapping(uint => address[])) addrToIdToQueue;
  mapping(address => mapping(uint => uint)) addrToIdToMinBid;

  /* events */
  event EventListed(
    address indexed eventAddress,
    string indexed baseMetaDataURI,
    Event event0
  );

  /* constructor */
  constructor(address _eventImplementation) {
    eventImplementation = _eventImplementation;
  }

  /* external functions */
  function createEvent(
    string memory _name,
    string memory _baseMetadataURI,
    uint256[] memory _tokenIds,
    uint256[] memory _tokenSupplies,
    uint256[] memory _tokenStatus,
    uint256[] memory _minBids
  ) external {
    if (_tokenIds.length != _tokenSupplies.length) {
      revert Auction__TokenIdsDoNotMatchTokenSupplies(
        _tokenIds.length,
        _tokenSupplies.length
      );
    }
    address eventAddress = Clones.clone(eventImplementation);
    IEvent(eventAddress).initialize(
      msg.sender,
      address(this),
      _baseMetadataURI
    );
    Event memory newEvent = Event(
      _name,
      address(this),
      _baseMetadataURI,
      _tokenIds,
      _tokenSupplies,
      _tokenStatus,
      _minBids
    );
    addrToNoOfTokenTypes[eventAddress] = _tokenIds.length;
    addrToEvent[eventAddress] = newEvent;
    addrToOrg[eventAddress] = msg.sender;

    for (uint i = 0; i < _tokenIds.length; i++) {
      addrToIdToMinBid[eventAddress][i] = _minBids[i];
    }
    emit EventListed(eventAddress, _baseMetadataURI, newEvent);
  }

  function updateMinBid(
    address _eventAddress,
    uint _tokenId,
    uint _newBid
  ) external {
    addrToIdToMinBid[_eventAddress][_tokenId] = _newBid;
  }

  function placeBid(
    address _eventAddress,
    uint _tokenId,
    uint _amount
  ) external {
    if (_amount < addrToIdToMinBid[_eventAddress][_tokenId]) {
      revert Auction__BidTooLow();
    }
    if (msg.sender.balance < addrToIdToMinBid[_eventAddress][_tokenId]) {
      revert Auction__NotEnoughFunds();
    }
    addrToIdToQueue[_eventAddress][_tokenId].push(msg.sender);
  }

  function settleAuction(address _eventAddress) external {
    if (msg.sender != addrToOrg[_eventAddress]) {
      revert Auction__UnauthorizedCaller();
    }
    for (uint i = 0; i < addrToNoOfTokenTypes[_eventAddress]; i++) {
        delete addrToIdToQueue[_eventAddress][i];
    delete addrToIdToMinBid[_eventAddress][i];
      for (uint j = 0; j < addrToIdToQueue[_eventAddress][i].length; j++) {
        IEvent(_eventAddress).mint(addrToIdToQueue[_eventAddress][i][j], i, 1);
      }
    }

    delete addrToEvent[_eventAddress];
    delete addrToOrg[_eventAddress];
    delete addrToNoOfTokenTypes[_eventAddress];
  }

  //   function buyNow(
  //     address _eventAddress,
  //     uint _tokenId,
  //     uint _amountOfTokens
  //   ) external {}

  // function transferBalance() external {}
  // function deleteAuction() external {}
}
