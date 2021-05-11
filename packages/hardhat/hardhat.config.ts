/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import { HardhatUserConfig } from "hardhat/types";
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy-ethers';
import 'hardhat-deploy';
import '@symfoni/hardhat-react';
// import 'hardhat-typechain';
// import '@typechain/ethers-v5';
import 'tsconfig-paths/register';
import { task } from 'hardhat/config';
const config: HardhatUserConfig = {};
export default config;
// require('hardhat-deploy');
require('dotenv').config();
// require('@nomiclabs/hardhat-ethers');
// require('hardhat-abi-exporter');
const chalk = require('chalk');
const fs = require('fs');
const INFURA_PROJECT_ID = process.env.INFURA_PID;
const KOVAN_PRIVATE_KEY = process.env.KOVAN_KEY;
const FORKING_ID = process.env.FORKING_ID;
 
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
 
  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  // typechain: {
  //   outDir: "src/types",
  //   target: "ethers-v5",
  // },
  solidity: {
    compilers: [
      {
        version: "0.8.0"
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ]
   },
   networks: {
     kovan: {
       url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
       accounts: [`0x${KOVAN_PRIVATE_KEY}`]
     },
     arbkovan4: {
      gasPrice: 0,
      url: "https://kovan4.arbitrum.io/rpc",
      
      // hardhat: {
      //   forking: {
      //     url: `https://eth-mainnet.alchemyapi.io/v2/${FORKING_ID}`,
      //     blockNumber: 11395144
      //   }
      // }
     }
   },
   watcher: {
       tasks: ["compile"],
       files: ["app", "contracts"]
   },
   paths: {
     sources: './contracts',
     tests: './test',
     cache: './cache',
     artifacts: './artifacts', 
     deploy: "./deploy",
     deployments: './deployments',
     imports: './imports'
   },
  //  abiExporter: {
  //    path: './app/src/abis',
  //    clear: true,
  //    flat: true,
  //    only: []
  //  },
  //  spdxLicenseIdentifier: {
  //    overwrite: true,
  //    runOnCompile: true
  //  }
 }