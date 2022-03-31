import Web3 from "web3";
window.ethereum.request({ method: "eth_requestAccounts" });
console.log("window.ethereum");
console.log(window.ethereum);
console.log("window.ethereum.Proxy");
console.log(window.ethereum.Proxy);

const web3 = new Web3(window.ethereum);

export default web3;