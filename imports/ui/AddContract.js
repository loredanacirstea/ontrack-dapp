import React, { Component } from 'react';
import $ from 'jquery';
import OnTrack from '/imports/api/contract/OnTrack.js';
import { Input, Select, Button } from './components.js';

export default class AddContract extends Component {
  constructor(props) {
    super(props);
    this.addContract = this.addContract.bind(this);
    this.state = { submitted: 0, pending: 0 };

    let deadline = new Date();
    deadline.setMinutes(deadline.getMinutes() + 30);
    this.contract = {
      name: 'Contract_0',
      deadline
    }
  }

  addContract(ev) {
    let { contract } = this;
    let { networkId, observers } = this.props;
    let { client, name, provider, observer, deadline, ether } = contract;
    let { abi, data, gas } = OnTrack;
    let observerInst,
      self = this;

    client = web3.eth.accounts[0];
    this.setState({ submitted : 1 });
    console.log('client, name, provider, observer, deadline, ether', client, name, provider, observer, deadline, ether)
    if(!name || !provider || !observer || !deadline || !client)
      return;

    ether = parseFloat(ether);

    // Get selected Observer
    observerInst = observers.filter(o => {
      if(o._id == observer)
        return true;
    })[0];

    // Deploy new OnTrack contract
    let trackContract = web3.eth.contract(JSON.parse(abi));
    let track = trackContract.new(deadline.getTime(), provider, observerInst.address, {
      from: client,
      data,
      gas,
      value: web3.toWei(ether, 'ether')
    }, function (err, res) {
      console.log(err, res);

      if(!res)
        return;
      if(!res.address) {
        self.setState({pending: 1});
        return;
      }

      console.log('Contract mined! address: ' + res.address + ' transactionHash: ' + res.transactionHash);

      // Insert contract details in our database
      let obj = {
        name, client, provider, observer, deadline,
        networkId, abi, gas, data,
        address: res.address,
        transactionHash: res.transactionHash
      }
      Meteor.call('contracts.insert', obj);
      self.setState({pending: 0, submitted: 0})
    });
  }

  render() {
    let { contract } = this;
    const { submitted, pending } = this.state;
    const account = this.props.web3.eth.accounts[0];
    let options = this.props.observers.map(o => {
      return {value: o._id, label: o.name};
    });

    // Defaults
    contract.observer = contract.observer || (options[0] ? options[0].value : null);

    return React.createElement('div', {
        className: 'col col-1-2 tablet-col-1-1'
      },
      account ? null : React.createElement('span', {}, 'not logged in with MetaMask!'),
      React.createElement(Input, {
        label: 'Name',
        defaultValue: contract.name,
        className: (submitted && !contract.name) ? 'dapp-error': '',
        onChange: (value) => contract.name = value
      }),
      React.createElement(Input, {
        label: 'Ether',
        defaultValue: 0,
        onChange: (value) => contract.ether = value
      }),
      React.createElement(Input, {
        label: 'Provider',
        className: (submitted && !contract.provider) ? 'dapp-error': '',
        onChange: (value) => contract.provider = value
      }),
      React.createElement(Select, {
        label: 'Observer',
        options,
        onChange: (value) => contract.observer = value
      }),
      React.createElement(Input, {
        label: 'Deadline',
        defaultValue: contract.deadline,
        className: (submitted && !contract.deadline) ? 'dapp-error': '',
        onChange: (value) => contract.deadline = new Date(value)
      }),
      React.createElement(Button, {
        className: 'icon-plus large btn-submit',
        onClick: this.addContract
      }),
      !pending ? null :
        React.createElement('span', { className: 'dapp-pending'}, '.. pending ..')
    );
  }
}

AddContract.propTypes = {
  web3: React.PropTypes.object,
  contracts: React.PropTypes.array,
  observers: React.PropTypes.array
};
