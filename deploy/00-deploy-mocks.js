const { getNamedAccounts, deployments, network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium per request
const GAS_PRICE_LINK = 1e9 //link per gas. calculated value based on the gas price of the chain

// Eth price 1xe9
// Chainlink nodes pay the gas fees to give us randomness & do external execution
// So they price of request change based on the price of gas

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const args = [BASE_FEE, GAS_PRICE_LINK]
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("Local Network detected ! Deploying mocks ... ")
        // deploy a mock vrfcoordinator..
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        })
        log("Mocks Deployed!")
        log("----------------------------------------------------------")
        log("You are deploying to a local network, you'll need a local network running to interact")
        log(
            "Please run `yarn hardhat console --network localhost` to interact with the deployed smart contracts!"
        )
        log("----------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
