const { ethers, BigNumber } = require('ethers')

require('dotenv').config()

const WETHADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const { abi: WETHABI } = require('./WETH9.json')

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_MAINNET_URL)

async function main() {
	const wethContract = new ethers.Contract(WETHADDRESS, WETHABI, provider)

	const encodedFunction = wethContract.interface.encodeFunctionData('withdraw', [ ethers.utils.parseEther('1') ])
	const gas1 = await provider.estimateGas({
		to: WETHADDRESS,
		data: encodedFunction,
	})
	console.log(gas1.toNumber())
}

main()