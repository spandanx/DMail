import web3 from './web3';
// const { abi, evm } = require('./compile');

const address = "0xce5aD2655A502856103613478f74747138F18fB6";//"0x2e87c1424D77e63DA756bEb2E46AA036D9C47E58";

console.log(address);

const abi = 
[
	{
		"inputs": [],
		"name": "accountSignUp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "subject",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "body",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "typeOfMail",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "referenceMail",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "to",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "cc",
				"type": "address[]"
			},
			{
				"internalType": "address[]",
				"name": "bcc",
				"type": "address[]"
			}
		],
		"name": "sendMail",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkIfAccountExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAccounts",
		"outputs": [
			{
				"internalType": "contract MailAccount[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getMailAdvancedByAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address[]",
						"name": "to",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "cc",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "bcc",
						"type": "address[]"
					},
					{
						"internalType": "string",
						"name": "typeOfMail",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "referenceMail",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					}
				],
				"internalType": "struct MailObj.MailAdvanced",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "getMailBasicByAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "body",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "mailAddress",
						"type": "address"
					}
				],
				"internalType": "struct MailObj.MailBasic",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRecievedMailBasic",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "body",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "mailAddress",
						"type": "address"
					}
				],
				"internalType": "struct MailObj.MailBasic[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSentMailBasic",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "subject",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "body",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "mailAddress",
						"type": "address"
					}
				],
				"internalType": "struct MailObj.MailBasic[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, address);