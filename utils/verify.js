const { run } = require("hardhat");

const verify = async (contractAddress, args) => {
  console.log("verifying contract");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verify };
