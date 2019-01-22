pragma solidity ^0.5.0;

import '../app/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarChain is ERC721 {
  struct Star {
    string name;
  }
  string public name = "Gry0u Token";
  string public symbol = "GRT";

  mapping(uint256 => Star) public tokenIdToStarInfo;
  mapping(uint256 => uint256) public starsForSale;

  function createStar(string memory _name, uint256 _tokenId) public {
    Star memory newStar = Star(_name);
    tokenIdToStarInfo[_tokenId] = newStar;
    _mint(msg.sender, _tokenId);
  }

  function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
    require(this.ownerOf(_tokenId) == msg.sender);
    starsForSale[_tokenId] = _price;
  }

  function buyStar(uint256 _tokenId) public payable {
    require(starsForSale[_tokenId] > 0);
    uint256 starCost = starsForSale[_tokenId];
    address addr = this.ownerOf(_tokenId);
    // cast to payable address
    address payable starOwner = address(uint160(addr));
    require(msg.value >= starCost);

    _transferFrom(starOwner, msg.sender, _tokenId);

    starOwner.transfer(starCost);

    // return unspent funds to buyer
    if(msg.value > starCost) {
      msg.sender.transfer(msg.value - starCost);
    }
    starsForSale[_tokenId] = 0;
  }

// Function that looks up the stars using the Token ID, and then returns the name of the star.
  function lookUpTokenIdToStarInfo(uint256 _tokenId) public view returns (string memory _name) {
    _name = tokenIdToStarInfo[_tokenId];
  }

// Function to let 2 users exchange their star tokens (provided their are mutually approved)
  function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
    // transfer token1 to user2
    safeTransferFrom(ownerOf(_tokenId1), ownerOf(_tokenId2), _tokenId1)
    // transfer token2 to user1
    safeTransferFrom(ownerOf(_tokenId2), ownerOf(_token1), _tokenId2)
  }

// Function to Transfer a Star from the address of the caller to destination address
  function transfer(address memory to, uint256 _tokenId) public {
    safeTransferFrom(msg.sender, to, _tokenId)
  }

}
