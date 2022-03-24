const path = require("path");
const fs = require("fs");
const solc = require("solc");

console.log("Calling compile.js");

// const dmailPath = path.resolve(__dirname, "contracts", "DMail.sol");
// const dmailPath = path.resolve(__dirname, "contracts", "MailAccount.sol");
const dmailPath = path.resolve(__dirname, "contracts", "AccountManager.sol");
const source = fs.readFileSync(dmailPath, "utf8");

// module.exports = solc.compile(source, 1).contracts[":Lottery"];
// console.log("Done");

// console.log(solc.compile(source, 1));

// const inboxpath = path.resolve(__dirname, 'Contracts', 'Inbox.sol');
// const source = fs.readFileSync(inboxpath, 'UTF-8');

var input = {
    language: 'Solidity',
    sources: {
        'AccountManager.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

// var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(solc.compile(JSON.stringify(input)));
// var code = output.contracts['DMail.sol'].DMail;
// console.log(code);
// var output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//     'AccountManager.sol'
//   ].AccountManager);
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'AccountManager.sol'
  ].AccountManager;
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['dmail.sol'].DMail);