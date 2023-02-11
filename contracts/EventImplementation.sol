//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* IMPORTS */
import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";

/* ERRORS */
error CollectionImplementation__AlreadyInitialized();
error Collection__OnlyCallableThroughAuctionContract(address caller);

contract EventImplementation is ERC1155Upgradeable {
    /* state variables */
    string private baseMetadataURI;
    address public auctionContract;
    address public organizer;

    function initialize(
        address _organizer,
        address _auctionContract,
        string memory _baseMetadataURI
    ) external {
        if (!(organizer == address(0))) {
            revert CollectionImplementation__AlreadyInitialized();
        }
        organizer = _organizer;
        auctionContract = _auctionContract;
        baseMetadataURI = _baseMetadataURI;
        __ERC1155_init(_baseMetadataURI);
    }

    function mint(address _to, uint256 _tokenId, uint256 _amount) external {
        if (msg.sender != auctionContract) {
            revert Collection__OnlyCallableThroughAuctionContract(msg.sender);
        }
        _mint(_to, _tokenId, _amount, "");
    }
}
