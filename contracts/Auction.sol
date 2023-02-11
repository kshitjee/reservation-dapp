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
    mapping(address => mapping(uint => address[])) addrToIdToQueue;
    mapping(address => mapping(uint => uint)) addrToIdToMinBid;

    /* events */
    event EventListed(
        address indexed eventAddress,
        string indexed baseMetaDataURI,
        Event event0
    );

    // event BidPlaced (
    //     address indexed hello,
    // );
    // event ReservationBought (
    //     address indexed eventAddress,
    // )
    // event AuctionWon (
    //     address indexed eventAddress,
    // );
    // event AuctionDeleted (
    //     address indexed eventAddress,
    // );

    /* modifiers  onlyEventOwner(msg.sender) */
    modifier onlyEventOwner(address owner) {
        if (msg.sender != owner) {
            revert Auction__OnlyEventOwnerCanCall(msg.sender);
        }
        _;
    }

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
        IEvent(eventAddress).initialize(address(this), _baseMetadataURI);
        Event memory newEvent = Event(
            _name,
            address(this),
            _baseMetadataURI,
            _tokenIds,
            _tokenSupplies,
            _tokenStatus,
            _minBids
        );
        addrToEvent[eventAddress] = newEvent;

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
        
    }

    function placeBid(
        address _eventAddress,
        uint _tokenId,
        uint _amount
    ) external {
        if (_amount < addrToIdToMinBid[_eventAddress][_tokenId]) {
            revert Auction__BidTooLow();
        }
    }
}
