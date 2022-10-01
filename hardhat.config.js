require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "hsLhBFf1zZe60OUc2yUNRoohqo0nLo7b";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "e657d4ea627fa889d81f291a79a631f5f7eedf76e8c8ed1f38ca667c85135c47";

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
