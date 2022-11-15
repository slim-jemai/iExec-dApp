//https://eth-goerli.g.alchemy.com/v2/pz7wlt8xwF41Ou_bcOvblPSLAE2dIm4x     for lottery app
//0x15Aae79E2A65e0294b61916fC2190a51a1e1F856                               for lottery app

//https://eth-goerli.g.alchemy.com/v2/0P7jROez8dXh_HC9LYFaNV3IOWMEqLxI     for nft 
//0xC14A757C7a65e68127BFbB515A4c281dEfb81807                               for nft

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.1',
  networks: {
    goerli:{
      url: 'https://eth-goerli.g.alchemy.com/v2/0P7jROez8dXh_HC9LYFaNV3IOWMEqLxI',
      accounts: ['83686be3fde4d3fca547cfc9eab89e8eef72e07ab1eef1344387a65ed20315cc']
    }
  }
}
