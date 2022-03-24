import web3 from './web3';
// const { abi, evm } = require('./compile');

const address = "0x6Ec1B2C3f3a4ffeBfD421Ff0Bd5Bd993Fe9522CC";

console.log(address);

const abi = 
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"inputs":[],"name":"getSentMails","outputs":[{"components":[{"internalType":"string","name":"body","type":"string"}],"internalType":"struct DMail.Mail[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xc24f6dc6"},{"inputs":[{"internalType":"string","name":"message","type":"string"}],"name":"sendMail","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x2bb2f3bc"}]

export default new web3.eth.Contract(abi, address);