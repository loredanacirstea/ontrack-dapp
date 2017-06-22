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
    let { networkId, observers } = this.props;
    let { client, name, provider, observer, deadline, ether } = contract;
    let { abi, data, gas } = OnTrack;
    let deadlineDiff, observerInst;

    client = web3.eth.accounts[0];

    if(!name || !provider || !observer || !deadline || !client)
      return;

    // Deadline is actually the difference in seconds between the deadline and now
    deadlineDiff = (deadline.getTime() - Date.now()) / 1000;
    ether = parseFloat(ether);

    // Get selected Observer
    observerInst = observers.filter(o => {
      if(o._id == observer)
        return true;
    })[0];

    // Deploy new OnTrack contract
    let trackContract = web3.eth.contract(JSON.parse(abi));
    let track = trackContract.new(deadlineDiff, provider, observerInst.address, {
      from: client,
      data,
      gas,
      value: web3.toWei(ether, 'ether')
    }, function (err, res) {
      console.log(err, res);

      if(!res || !res.address)
        return;
      console.log('Contract mined! address: ' + res.address + ' transactionHash: ' + res.transactionHash);

      // Insert contract details in our database
      let obj = {
        name, client, provider, observer, deadline,
        networkId, abi, gas, data,
        address: res.address,
        transactionHash: res.transactionHash
      }
      Meteor.call('contracts.insert', obj);
    });
  }

  render() {
    let options = this.props.observers.map(o => {
      return {value: o._id, label: o.name};
    });

    // Defaults
    this.contract.observer = options[0] ? options[0].value : null;
    this.contract.name = 'Contract_0';
    this.contract.deadline = new Date();

    return React.createElement('div', {
        className: 'col col-1-2 tablet-col-1-1'
      },
      React.createElement(Input, {
        label: 'Name',
        defaultValue: this.contract.name,
        onChange: (value) => this.contract.name = value
      }),
      React.createElement(Input, {
        label: 'Ether',
        defaultValue: 0,
        onChange: (value) => this.contract.ether = value
      }),
      React.createElement(Input, {
        label: 'Provider',
        onChange: (value) => this.contract.provider = value
      }),
      React.createElement(Select, {
        label: 'Observer',
        options,
        onChange: (value) => this.contract.observer = value
      }),
      //React.createElement(Datetime, {onChange: this.setDeadline, closeOnSelect: true})
      React.createElement(Input, {
        label: 'Deadline',
        defaultValue: this.contract.deadline,
        onChange: this.setDeadline
      }),
      React.createElement(Button, {
        className: 'icon-plus large btn-submit',
        onClick: this.addContract
      })
    );
  }
}

AddContract.propTypes = {
  web3: React.PropTypes.object,
  contracts: React.PropTypes.array,
  observers: React.PropTypes.array
};
