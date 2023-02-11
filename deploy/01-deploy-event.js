const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async function ({ getNamedAccounts, deployments }) {
  /* important variables for deployment */
  const { deploy, log } = deployments;
  const { owner } = await getNamedAccounts();
  const args = [];

  /* deployment */
  log("deploying event implementation contract");
  const eventDeployment = await deploy("EventImplementation", {
    from: owner,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  /* verification */
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(eventDeployment.address, args);
  }
  log("deployed & verfied (if needed)");
};

module.exports.tags = ["all", "event"];
