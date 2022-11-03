const { ethers, BigNumber } = require('ethers')

require('dotenv').config()

const WETHADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const { abi: WETHABI } = require('./WETH9.json')

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL_MAINNET)

async function main() {

	// initialise contract locally. Passing in WETH and providers
	const wethContract = new ethers.Contract(WETHADDRESS, WETHABI, provider)

	// Grabbing local initialised function and calling function that swap it back to Ether
	const encodedFunction = wethContract.interface.encodeFunctionData('withdraw', [ ethers.utils.parseEther('1') ])
	const gas1 = await provider.estimateGas({
		to: WETHADDRESS,
		data: encodedFunction,
	})
	console.log(gas1.toNumber())

	// Calling a contract which then calls other contract
	const gas2 = await wethContract.estimateGas.withdraw(ethers.utils.parseEther('1'))
	console.log(gas2.toNumber())
}

main()