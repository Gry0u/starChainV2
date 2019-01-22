const StarChain = artifacts.require('./StarChain.sol')

contract('StarChain', async accs => {
  const user1 = accs[0]
  const user2 = accs[1]
  const tokenId = 1
  const starPrice = web3.utils.toWei('0.01', 'ether')

  it('can create a star', async () => {
    const instance = await StarChain.deployed()
    await instance.createStar('Star', tokenId, { from: user1 })
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Star')
  })

  it('can put a star up to sale', async () => {
    const instance = await StarChain.deployed()
    await instance.putStarUpForSale(tokenId, starPrice, { from: user1 })
    assert.equal(await instance.starsForSale.call(tokenId), starPrice)
  })

  it('lets a user receive funds after his star is bought by another user', async () => {
    const instance = await StarChain.deployed()
    const balanceBeforeTx = await web3.eth.getBalance(user1)
    await instance.buyStar(tokenId, { from: user2, value: starPrice })
    const balanceAfterTx = await web3.eth.getBalance(user1)
    assert.equal(+balanceBeforeTx + +starPrice, balanceAfterTx)
  })

  it('lets a user become a owner of the star he bought from another user', async () => {
    const instance = await StarChain.deployed()
    await instance.putStarUpForSale(tokenId, starPrice, { from: user2 })
    assert.equal(await instance.ownerOf.call(tokenId), user2)
    await instance.buyStar(tokenId, { from: user1, value: starPrice })
    assert.equal(await instance.ownerOf.call(tokenId), user1)
  })

  it('decreases the balance of the buyer of a star', async () => {
    const instance = await StarChain.deployed()
    await instance.putStarUpForSale(tokenId, starPrice, { from: user1 })
    const balanceBeforeTx = await web3.eth.getBalance(user2)
    await instance.buyStar(tokenId, { from: user2, value: starPrice, gasPrice: 0 })
    const balanceAfterTx = await web3.eth.getBalance(user2)
    assert.equal(+balanceBeforeTx - +starPrice, balanceAfterTx)
  })

  it('has a token name and symbol', async () => {
    const instance = await StarChain.deployed()
    assert.equal(await instance.name.call(), 'Gry0u Token')
    assert.equal(await instance.symbol.call(), 'GRT')
  })

  // 2) 2 users can exchange their stars.
  it('lets 2 users exchange their stars (provided they mutually approved each other)', async () => {

  })
  // 3) Stars Tokens can be transferred from one address to another.
  it('can transfer a token to another address', async () => {
    
  })
})
