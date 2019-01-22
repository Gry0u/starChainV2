pragma solidity ^0.5.0;

import '../app/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarChain is ERC721 {
  struct Star {
    string name;
  }

  //  Add a name and a symbol for your starNotary tokens

//

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

// Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.

//

// Add a function called exchangeStars, so 2 users can exchange their star tokens...
//Do not worry about the price, just write code to exchange stars between users.

// Write a function to Transfer a Star. The function should transfer a star from the address of the caller.
// The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.
//

}
