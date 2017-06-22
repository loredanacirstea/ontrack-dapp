import React, { Component } from 'react';
import $ from 'jquery';
import OnTrack from '/imports/api/contract/OnTrack.js';
import { Input, Select, Button } from './components.js';

export default class AddContract extends Component {
  constructor(props) {
    super(props);
    this.setDeadline = this.setDeadline.bind(this);
    this.addContract = this.addContract.bind(this);
    this.contract = {};
  }

  setDeadline(value) {
    this.contract.deadline = new Date(value);
  }

  addContract(ev) {
    let { contract } = this;
    let { networkId } = this.props;

    if(!contract.name || !contract.provider || !contract.observer || !contract.deadline)
      return;

    contract.client = web3.eth.accounts[0];
    if(!contract.client)
      return;

    // Deadline is actually the difference in seconds between the deadline and now
    let deadlineDiff = (contract.deadline.getTime() - Date.now()) / 1000;


    let observer = this.props.observers.filter(o => {
      if(o._id == contract.observer)
        return true;
    })[0];

    let trackContract = web3.eth.contract(JSON.parse(OnTrack.abi));
    // Deploy contract
    let track = trackContract.new(deadlineDiff, contract.provider, observer.address, {
      from: contract.client,
      data: OnTrack.data,
      gas: OnTrack.gas
    }, function (err, res) {
      console.log(err, res);
      if(!res || !res.address)
        return;

      console.log('Contract mined! address: ' + res.address + ' transactionHash: ' + res.transactionHash);
      contract.address = res.address;
      contract.transactionHash = res.transactionHash;
      contract.networkId = networkId;
      contract = Object.assign(contract, OnTrack);
      delete contract.code;
      Meteor.call('contracts.insert', contract);
    });
  }

  render() {
    let options = this.props.observers.map(o => {
      return {value: o._id, label: o.name};
    });

    // Defaults
    this.contract.observer = options[0] ? options[0].value : null;
    this.contract.name = 'Contract1';
    this.contract.deadline = new Date();

    return React.createElement('div', {},
      React.createElement(Input, {label: 'Name', defaultValue: this.contract.name, onChange: (value) => this.contract.name = value}),
      React.createElement(Input, {label: 'Provider', onChange: (value) => this.contract.provider = value}),
      React.createElement(Select, {label: 'Observer', options, onChange: (value) => this.contract.observer = value}),
      //React.createElement(Datetime, {onChange: this.setDeadline, closeOnSelect: true})
      React.createElement(Input, {label: 'Deadline', defaultValue: this.contract.deadline, onChange: this.setDeadline}),
      React.createElement(Button, {label: '+', onClick: this.addContract})
    );
  }
}

AddContract.propTypes = {
  web3: React.PropTypes.object,
  contracts: React.PropTypes.array,
  observers: React.PropTypes.array
};
