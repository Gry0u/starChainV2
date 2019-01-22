import Web3 from "web3";
import starChainArtifact from "../../build/contracts/StarChain.json";

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
  },

  setStatus: message => {
    const status = document.getElementById('status')
    status.innerHTML = message
  },

  createStar: async function () {
    const { createStar } = this.starChain.methods
    const name = document.getElementById('starName').value
    const id = document.getElementById('starID').value
    await createStar(name, id).send({ from: this.account })
  }
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
    );
  }

  App.start();
});
