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
    console.log('addContract', this.contract);

    if(!contract.name || !contract.client || !contract.provider || !contract.observer || !contract.deadline)
      return;

    let observer = this.props.observers.filter(o => {
      if(o._id == contract.observer)
        return true;
    })[0];

    let trackContract = web3.eth.contract(OnTrack.abi);

    // Deploy contract
    let track = observerContract.new(
       {
         from: web3.eth.accounts[0],
         data: trackContract.data,
         gas: trackContract.gas
       }, function (err, contract){
        console.log(err, contract);
        if (typeof contract.address !== 'undefined') {
             console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
             //Meteor.call('observers.insert', {})
        }
     });

  }

  render() {
    let options = this.props.observers.map(o => {
      return {value: o._id, label: o.name};
    });
    console.log('options', options);
    return React.createElement('div', {},
      React.createElement(Input, {label: 'Name', onChange: (value) => this.contract.name = value}),
      React.createElement(Input, {label: 'Client', onChange: (value) => this.contract.client = value}),
      React.createElement(Input, {label: 'Provider', onChange: (value) => this.contract.provider = value}),
      React.createElement(Select, {label: 'Observer', options, onChange: (value) => this.contract.observer = value}),
      //React.createElement(Datetime, {onChange: this.setDeadline, closeOnSelect: true})
      React.createElement(Input, {label: 'Deadline', onChange: this.setDeadline}),
      React.createElement(Button, {label: '+', onClick: this.addContract})
    );
  }
}

AddContract.propTypes = {
  web3: React.PropTypes.object,
  contracts: React.PropTypes.array,
  observers: React.PropTypes.array
};
