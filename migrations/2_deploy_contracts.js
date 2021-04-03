const StarChain = artifacts.require('./StarChain.sol')

module.exports = function (deployer) {
  deployer.deploy(StarChain)
}
