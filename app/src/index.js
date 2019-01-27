import Web3 from "web3";
import starChainArtifact from "../../build/contracts/StarChain.json";
import './css/index.css'
import './css/responsive.css'
import './img/galaxy_background.jpg'

const App = {
  web3: null,
  account: null,
  starChain: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starChainArtifact.networks[networkId];
      this.starChain = new web3.eth.Contract(
        starChainArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
    this.refreshWallet()
  },

  setStatus: message => {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  createStar: async function () {
    const { createStar } = this.starChain.methods
    const name = document.getElementById('starName').value
    const id = document.getElementById('starIdCreate').value
    await createStar(name, id).send({ from: this.account })
    this.refreshWallet()
  },

  readStar: async function () {
    const { lookUpTokenIdToStarInfo, ownerOf } = this.starChain.methods
    const id = document.getElementById('starIdRead').value
    const owner = await ownerOf(id).call()
    const name = await lookUpTokenIdToStarInfo(id).call()
    document.getElementById('status').innerHTML = `Star ${id} - name: ${name} - owner: ${owner}`
  },

  refreshWallet: async function () {
    const { balanceOf } = this.starChain.methods
    const wallet = document.getElementById('wallet')
    const ownedStars = await balanceOf(this.account).call()
    wallet.innerHTML = `Loaded address ${this.account} owns ${ownedStars} Stars`
  },

  sellStar: async function () {
    const { putStarUpForSale } = this.starChain.methods
    let price = document.getElementById('sellPrice').value
    const star = document.getElementById('starIdSell').value
    document.getElementById('status').innerHTML = `Star ${star} sold for ${price} ETH`
    price = this.web3.utils.toWei(price, 'ether')
    await putStarUpForSale(star, price).send({ from: this.account })
    this.refreshWallet()
  },

  buyStar: async function () {
    const { buyStar } = this.starChain.methods
    const star = document.getElementById('starIdBuy').value
    let price = document.getElementById('buyPrice').value
    document.getElementById('status').innerHTML = `Star ${star} bought for ${price} ETH`
    price = this.web3.utils.toWei(price, 'ether')
    await buyStar(star).send({ from: this.account, value: price })
    this.refreshWallet()
  },

  transfer: async function () {
    const { transfer } = this.starChain.methods
    const address = document.getElementById('dest').value
    const star = document.getElementById('starIdTransfer').value
    await transfer(address, star).send({ from: this.account })
    this.refreshWallet()
    document.getElementById('status').innerHTML = `Star ${star} transferred to ${address}`
  },

  // swap: async function () {
  //   const { exchangeStars } = this.starChain.methods
  //   const star1 = document.getElementById('starIdSwap1').value
  //   const star2 = document.getElementById('starIdSwap2').value
  //   await exchangeStars(star1, star2)
  //   this.refreshWallet()
  //   document.getElementById('status').innerHTML = `Star ${star1} swapped for ${star2}`
  // },
  //
  // approve: async function () {
  //   const { approve } = this.starChain.methods
  //   const address = document.getElementById('address').value
  //   const star = document.getElementById('starIdTransfer').value
  //   await approve(address, star)
  //   document.getElementById('status').innerHTML = `Address ${address} approved for star ${star}`
  // }
}

window.App = App

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable() // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
    )
  }

  App.start()
});
