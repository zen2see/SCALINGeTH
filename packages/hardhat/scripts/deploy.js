/* global ethers hre */
const diamond = require('./js/diamond-util/src/index.js')

function addCommas (nStr) {
  nStr += ''
  const x = nStr.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  var rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  return x1 + x2
}

function strDisplay (str) {
  return addCommas(str.toString())
}

async function main (scriptName) {
  console.log('SCRIPT NAME:', scriptName)

  const accounts = await ethers.getSigners()
  const account = await accounts[0].getAddress()
  console.log('Account: ' + account)
  console.log('---')
  let tx
  let totalGasUsed = ethers.BigNumber.from('0')
  let receipt
  let vrfCoordinator
  let linkAddress
  let linkContract
  let keyHash
  let fee
  const gasLimit = 12300000
  const name = 'ARBI'
  const symbol = 'ARBI'

  if (hre.network.name === 'hardhat') {
    childChainManager = account
    //InitDiamond = account
    // const LinkTokenMock = await ethers.getContractFactory('LinkTokenMock')
    // linkContract = await LinkTokenMock.deploy()
    // await linkContract.deployed()
    // linkAddress = linkContract.address
    // keyHash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    // fee = ethers.utils.parseEther('0.0001')
    
  } else if (hre.network.name === 'matic') {
    // childChainManager = '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa'
    // vrfCoordinator = '0x3d2341ADb2D31f1c5530cDC622016af293177AE0'
    // linkAddress = '0xb0897686c545045aFc77CF20eC7A532E3120E0F1'
    // keyHash = '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da'
    // fee = ethers.utils.parseEther('0.0001')
    
    // // Matic ghst token address
    // ghstTokenContract = await ethers.getContractAt('GHSTFacet', '0x385Eeac5cB85A38A9a07A70c73e0a3271CfB54A7')
    // ghstStakingDiamond = '0xA02d547512Bb90002807499F05495Fe9C4C3943f'

    // dao = 'todo' // await accounts[1].getAddress()
    // daoTreasury = 'todo'
    // rarityFarming = 'todo' // await accounts[2].getAddress()
    // pixelCraft = 'todo' // await accounts[3].getAddress()
  } else if (hre.network.name === 'kovan') {
    childChainManager = account
    // vrfCoordinator = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9'
    // linkAddress = '0xa36085F69e2889c224210F603D836748e7dC0088'
    // keyHash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    // fee = ethers.utils.parseEther('0.1')
    // ghstTokenContract = await ethers.getContractAt('GHSTFacet', '0xeDaA788Ee96a0749a2De48738f5dF0AA88E99ab5')
    // ghstStakingDiamond = '0xA4fF399Aa1BB21aBdd3FC689f46CCE0729d58DEd'
    
  }  else {
    throw Error('No network settings for ' + hre.network.name)
  }

  async function deployFacets (...facets) {
    const instances = []
    for (let facet of facets) {
      let constructorArgs = []
      if (Array.isArray(facet)) {
        console.log('beforesemic')
        ;[facet, constructorArgs] = facet
        console.log(facet);
        console.log("aftersemic " +constructorArgs);
      }
      console.log('After deployFacets in deploy script the constructorArgs' + constructorArgs)
      const factory = await ethers.getContractFactory(facet)
      const facetInstance = await factory.deploy(...constructorArgs)
      await facetInstance.deployed()
      const tx = facetInstance.deployTransaction
      const receipt = await tx.wait()
      console.log(`${facet} deploy gas used: ` + strDisplay(receipt.gasUsed))
      totalGasUsed = totalGasUsed.add(receipt.gasUsed)
      instances.push(facetInstance)
    }
    return instances
  }

  let [
    arbibasketFacet,
    callFacet,
    erc20Facet,
  ] = await deployFacets(
    'contracts/arbiswap/facets/ArbiBasketFacet.sol:ArbiBasketFacet',
    'contracts/arbiswap/facets/CallFacet.sol:CallFacet',
    'contracts/arbiswap/facets/ERC20Facet.sol:ERC20Facet',

  )

  // eslint-disable-next-line no-unused-vars
  const arbiswapDiamond = await diamond.deploy({
    diamondName: 'ARBIdiamond',
    initDiamond: 'contracts/arbiswap/InitDiamond.sol:InitDiamond',
    facets: [
      ['ArbiBasketFacet', arbibasketFacet],
      ['CallFacet', callFacet],
      ['ERC20Facet', erc20Facet]
    ],
    owner: account, 
    args: [[name, symbol]]
  })
  console.log('ARBISWAP diamond address:' + arbiswapDiamond.address)

  tx = arbiswapDiamond.deployTransaction
  receipt = await tx.wait()
  console.log('ARBI diamond deploy gas used:' + strDisplay(receipt.gasUsed))
  totalGasUsed = totalGasUsed.add(receipt.gasUsed)

  const diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', arbiswapDiamond.address)
  arbibasketFacet = await ethers.getContractAt('contracts/arbiswap/facets/ArbiBasketFacet.sol:ArbiBasketFacet', arbiswapDiamond.address)
  callFacet = await ethers.getContractAt('contracts/arbiswap/facets/CallFacet.sol:CallFacet', arbiswapDiamond.address)
  erc20Facet = await ethers.getContractAt('contracts/arbiswap/facets/ERC20Facet.sol:ERC20Facet', arbiswapDiamond.address)

  // // if (hre.network.name === 'matic') {
  //   // transfer ownership
  //   const newOwner = '0x94cb5C277FCC64C274Bd30847f0821077B231022'
  //   console.log('Transferring ownership of diamond: ' + bscb20Diamond.address)
  //   const diamond = await ethers.getContractAt('OwnershipFacet', bscb20Diamond.address)
  //   const tx = await diamond.transferOwnership(newOwner)
  //   console.log('Transaction hash: ' + tx.hash)
  //   receipt = await tx.wait()
  //   console.log('Transfer Transaction complete')
  //   console.log('Gas used:' + strDisplay(receipt.gasUsed))
  //   totalGasUsed = totalGasUsed.add(receipt.gasUsed)
  // // }

  console.log('Total gas used: ' + strDisplay(totalGasUsed))
  return {
    account: account,
    arbiswapDiamond: arbiswapDiamond,
    diamondLoupeFacet: diamondLoupeFacet,
    arbibasketFacet: arbibasketFacet,
    callFacet: callFacet,
    erc20Facet: erc20Facet,
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployProject = main
