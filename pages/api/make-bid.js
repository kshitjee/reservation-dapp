import ethers from "ethers";
import abi from "../../auction-contract-abi";

export default async function handler(req, res) {
  const contractAddress = "0x1234567890123456789012345678901234567890";
  const contractABI = abi; // Replace with the ABI of your contract
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.GOERLI_URL.toString()
  );
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

//   const tx = await contract.placeBid()
// tx.wait()

}
