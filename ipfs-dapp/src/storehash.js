import web3 from './web3';

const address = '0x8e8D23B1Ef514e02a8aF203D78C7dD810C76FDc1';

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "string"
			}
		],
		"name": "setHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"name": "x",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var MyContract = web3.eth.contract(abi);

var MyContractInstance = MyContract.at(address);


export default MyContractInstance;