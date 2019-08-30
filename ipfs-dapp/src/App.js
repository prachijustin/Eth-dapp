import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
import { Table, Form, Button } from 'reactstrap';


class App extends Component {

  state = {
    ipfsHash: null,
    buffer: '',
    ethAddress: '',
    blockNumber: '',
    transactionHash: '',
    gasUsed: '',
    txReceipt: ''
  };

  captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => this.convertToBuffer(reader)
  };

  convertToBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({buffer});
  };

  onClick = async() => {
    try {
      this.setState({blockNumber: "waiting..."});
      this.setState({gasUsed: "waiting...."});

      await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
        console.log(err, txReceipt);
        this.setState({txReceipt});
      });

      await this.setState({blockNumber: this.state.txReceipt.blockNumber});
      await this.setState({gasUsed: this.state.txReceipt.gasUsed});
    }
    catch(error) {
      console.log(error);
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.accounts;

    console.log('sending from account: ' + accounts[0]);

    const ethAddress = '0x8e8D23B1Ef514e02a8aF203D78C7dD810C76FDc1';
    this.setState({ethAddress});

    console.log(storehash);
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      this.setState({ipfsHash: ipfsHash[0].hash});
      var transactionHash = storehash.setHash(this.state.ipfsHash);       
      this.setState({transactionHash});     
    })   
  };

  render(){
    return (
      <div className="App">
         
          
          <hr />

          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.onSubmit}>
            <input 
              type = "file"
              onChange = {this.captureFile}
            />
             <Button 
             bsStyle="primary" 
             type="submit"> 
             Send it 
             </Button>
          </Form>
<hr/>
 <Button onClick = {this.onClick}> Get Transaction Receipt </Button>
  <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr>
                    <td>IPFS Hash # stored on Eth Contract</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>
                  <tr>
                    <td>Tx Hash # </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>
                  <tr>
                    <td>Block Number # </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>
                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>
                
                </tbody>
            </Table>
      
     </div>
      );
  }
}

export default App;
