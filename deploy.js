const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./compile');

const provider = new HDWalletProvider(
  'angry snack table next census left sausage around flash ask private siren',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/ae1a60571a09452a8e9fb65b45187ef4'
  // remember to change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  // console.log("Balance1");
  // console.log(eth.getBalance());
  // console.log("Balance2");
  // console.log(web3.eth.getBalance());
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '10000000', from: accounts[0] });

  console.log(JSON.stringify(abi));
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
