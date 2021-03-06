const StarChain = artifacts.require('./StarChain.sol')

contract('StarChain', async accs => {
  const user1 = accs[0]
  const user2 = accs[1]
  const tokenId = 0
  const starPrice = web3.utils.toWei('0.01', 'ether')
  // test 1
  it('can create a star', async () => {
    const instance = await StarChain.deployed()
    await instance.createStar('Star', tokenId, { from: user1 })
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Star')
  })

  // test 2
  it('can put a star up to sale', async () => {
    const instance = await StarChain.deployed()
    await instance.putStarUpForSale(tokenId, starPrice, { from: user1 })
    assert.equal(await instance.starsForSale.call(tokenId), starPrice)
  })

  // test 3
  it('lets a user receive funds after his star is bought by another user', async () => {
    const instance = await StarChain.deployed()
    const balanceBeforeTx = await web3.eth.getBalance(user1)
    await instance.buyStar(tokenId, { from: user2, value: starPrice })
    const balanceAfterTx = await web3.eth.getBalance(user1)
    assert.equal(+balanceBeforeTx + +starPrice, balanceAfterTx)
  })

  // test 4
  it('lets a user become a owner of the star he bought from another user', async () => {
    const instance = await StarChain.deployed()
    await instance.putStarUpForSale(tokenId, starPrice, { from: user2 })
    assert.equal(await instance.ownerOf.call(tokenId), user2)
    await instance.buyStar(tokenId, { from: user1, value: starPrice })
    assert.equal(await instance.ownerOf.call(tokenId), user1)
  })

  // test 5
  it('decreases the balance of the buyer of a star', async () => {
    const instance = await StarChain.deployed()
    await instance.putStarUpForSale(tokenId, starPrice, { from: user1 })
    const balanceBeforeTx = await web3.eth.getBalance(user2)
    await instance.buyStar(tokenId, { from: user2, value: starPrice, gasPrice: 0 })
    const balanceAfterTx = await web3.eth.getBalance(user2)
    assert.equal(+balanceBeforeTx - +starPrice, balanceAfterTx)
  })

  // test 6
  it('has a token name and symbol', async () => {
    const instance = await StarChain.deployed()
    assert.equal(await instance.name.call(), 'Gry0u Token')
    assert.equal(await instance.symbol.call(), 'GRT')
  })

  // test 7.
  it('lets 2 users exchange their stars (provided they mutually approved each other)', async () => {
    const instance = await StarChain.deployed()
    await instance.createStar('Star1', 1, { from: user1 })
    await instance.createStar('Star2', 2, { from: user2 })
    // Approve user1 to transfer token of user2
    await instance.approve(user1, 2, { from: user2 })
    // swap stars
    await instance.exchangeStars(1, 2, { from: user1 })
    assert.equal(await instance.ownerOf(1), user2)
    assert.equal(await instance.ownerOf(2), user1)
    // user1 has token2, user2 has token1
  })
  // test 8
  it('can transfer a token to another address', async () => {
    const instance = await StarChain.deployed()
    await instance.createStar('StarToTransfer', 3, { from: user1 })
    // transfer to user 2
    await instance.transfer(user2, 3)
    assert.equal(await instance.ownerOf(3), user2)
  })
})
