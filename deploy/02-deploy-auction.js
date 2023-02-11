const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async function ({ getNamedAccounts, deployments }) {
  /* important variables for deployment */
  const { deploy, log } = deployments;
  const { owner } = await getNamedAccounts();
  //   const args1 = ["0x435C7bFd1895410718fe9e190ce2050857345107"];

  /* deployment */
  log("deploying auction implementation contract");
  const auctionDeployment = await deploy("Auction", {
    from: owner,
    args: ["0x435C7bFd1895410718fe9e190ce2050857345107"],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  /* verification */
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(auctionDeployment.address, ["0x435C7bFd1895410718fe9e190ce2050857345107"]);
  }
  log("deployed & verfied (if needed)");
};
module.exports.tags = ["all", "auction"];
