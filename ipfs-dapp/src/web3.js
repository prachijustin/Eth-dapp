

var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var account = web3.eth.accounts[0];
web3.eth.defaultAccount = account;
//personal.unlockAccount(web3.eth.defaultAccount);

console.log(account);
// web3.eth.getBlock(5, function(error, result){
//     if(!error)
//         console.log(JSON.stringify(result));
//     else
//         console.error(error);
//  })
export default web3;