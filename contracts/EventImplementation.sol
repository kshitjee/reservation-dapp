//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* IMPORTS */
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";

/* ERRORS */
error CollectionImplementation__AlreadyInitialized();
error CollectionImplementation__ExcessiveNFTTypes();

contract CollectionImplemenation is ERC1155Upgradeable {
  /* STATE VARIABLES */
  string private baseMetadataURI;
  address public owner;

  function initialize(
    address _owner,
    string[] memory  _NFTTypes,
    string memory _baseMetadataURI
  ) external {
    if (!(owner == address(0))) {
      revert CollectionImplementation__AlreadyInitialized();
    }
    //create an error if size of nft types >5

    if (_NFTTypes.length > 5) {
      revert CollectionImplementation__ExcessiveNFTTypes();
    }
    owner = _owner;
    baseMetadataURI = _baseMetadataURI;
    __ERC1155_init(_baseMetadataURI);
  }

  function mint(
    address _to,
    uint256 _tokenId,
    uint256 _amount
  ) external {
    _mint(_to, _tokenId, _amount, "");
  }
}