import web3 from './web3';
// const { abi, evm } = require('./compile');

const address = "0x753dAD6386613D81AC6D59D43D33D92965EE8F7d";

console.log(address);

const abi = 
[{"inputs":[],"name":"accountSignUp","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x9aadf832"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"checkIfValidAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xaa4dee02"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getAccountInstance","outputs":[{"internalType":"contract DMail","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xeac542a8"},{"inputs":[],"name":"getAllAccounts","outputs":[{"internalType":"contract DMail[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x08e93d0a"},{"inputs":[],"name":"getRecievedMail","outputs":[{"components":[{"internalType":"string","name":"body","type":"string"}],"internalType":"struct DMail.Mail[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x68ad47db"},{"inputs":[],"name":"getSentMail","outputs":[{"components":[{"internalType":"string","name":"body","type":"string"}],"internalType":"struct DMail.Mail[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x291ffbe7"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"reciever","type":"address"},{"internalType":"string","name":"message","type":"string"}],"name":"sendMail","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0xd19c1980"}]

export default new web3.eth.Contract(abi, address);