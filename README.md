# Star Notary DAPP
In this project I deployed a unfungible token contract (ERC721) on the Ethereum Rinkeby network.  
I also develop a minimalist Front End to interact with the main functions of the contract:  
The user can then register a new stars that will be stored as an ERC721 token on the blockchain, or look up for existing ones..
## Getting started
**Prerequesites: You will need [Metamask](https://metamask.io/) and an [Infura](https://infura.io/) account.**
1. Clone or download [this](https://github.com/Gry0u/starChainV2) repository
2. Install dependencies  
```
cd starChainV2
npm install # will install truffle-hdwallet-provider
cd app
npm install # will install all other dependencies (web3, openzeppelin...)
cd ..
```
3. Run tests:
```
truffle develop
truffle(develop)> test
```
1. Metamask:
  - Connect to the Rinkeby network.
  - Look for your mnemonic passphrase in "settings"
  1. Write your Metamask mnemonic in a `.secret` file and save it in `starChainV2/`
3. Infura: write your Infura Project ID key in a `.infuraKey` file and save it in `starChainV2/`
4. Serve Front End:
```
cd app
npm run dev
```
5. Access Front End at [http://localhost:8080](http://localhost:8080)  

## Contract and token details
- ERC-721 Token Name: *Gry0u Token*  
- ERC-721 Token Symbol: *GRT*  
- “Token Address” on the Rinkeby Network: *0xfC435ceBdF28250D4f3920d713F9737c12E3823f*  
- [Test ERC 721 token creation](https://rinkeby.etherscan.io/token/0xfc435cebdf28250d4f3920d713f9737c12e3823f?a=0x45517697e4fc823be60a066ecca8139ce9c4659e)  

## Resources
- [Truffle](https://www.truffleframework.com/): smart contracts and DAPP development framework.
- [npm](https://www.npmjs.com/get-npm)
- [Infura](https://infura.io/): API to access remote Ethereum nodes
- [Metamask](https://metamask.io/): browser add-in to interact with the JavaScript Ethereum API [Web3](https://github.com/ethereum/web3.js/).
