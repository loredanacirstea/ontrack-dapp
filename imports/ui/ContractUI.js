import React, { Component } from 'react';
import { ethAddressAPI } from '/imports/api/namespace.js';

export default class ContractUI extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.applyCommand = this.applyCommand.bind(this);
  }

  getCommands(abi, type) {
    return abi.filter(c => {
      return c.type === type;
    });
  }

  applyCommand(command) {
    let { contract, web3 } = this.props;
    let inputs = [function(err, res) {
      console.log(command.name, err, res);
    }];

    // Apply command
    this.contractInst[command.name].apply(null, inputs);
  }

  render() {
    let { contract, web3 } = this.props;

    if(!contract || !contract.abi)
      return null;

    let href = ethAddressAPI + contract.address;
    let commands = this.getCommands(JSON.parse(contract.abi), 'function');
    let events = this.getCommands(JSON.parse(contract.abi), 'event');
    let roles = ['client', 'provider', 'any'];
    let role = 'no role';

    if(web3.eth.accounts[0])
      if(web3.eth.accounts[0] == contract.client)
        role = 'client';
      else if(web3.eth.accounts[0] == contract.provider)
        role = 'provired';
    this.contractInst = web3.eth.contract(JSON.parse(contract.abi)).at(contract.address);

    return React.createElement('div', {
      className: 'col col-1-2 tablet-col-1-1'
    },
      React.createElement('div', {},
        React.createElement('a', {
          className: 'dapp-small',
          href,
          target: '_blank'
        }, contract.address),
      ),
      React.createElement('div', {},
        React.createElement('span', {}, 'Current account: ' + role)
      ),
      React.createElement('div', {},
        commands.map((f, i) => {
          return React.createElement(CommandComponent, {
            web3,
            command: f,
            key: i,
            role: roles[i],
            onClick: this.applyCommand
          });
        })
      ),
      React.createElement(LogComponent, {
        contract,
        web3,
        instance: this.contractInst,
        events
      })
    );
  }
}

class CommandComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let { command, onClick } = this.props;
    onClick.call(null, command);
  }

  render() {
    let { command, role } = this.props;

    return React.createElement('div', {},
      React.createElement('button', { onClick: this.onClick, className: 'dapp-block-button btn-cmd' }, command.name),
      command.inputs[0] ? React.createElement('input', {name: 'input'}) : null,
      React.createElement('span', {}, ' -- ' + role ),
    );
  }
}

class LogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { logs: [] };
    this.logContract = this.logContract.bind(this);
  }

  logContract() {
    let { web3, contract, instance, events } = this.props;
    let self = this;
    console.log('filter', contract.address, instance, events);
    /*var filter = web3.eth.filter({
      fromBlock: 0,
      address: contract.address,
      topics: [web3.sha3('newtest(string,uint256,string,string,uint256)')]*/

    events.forEach(e => {
      var event = instance[e.name]({

        }, function(error, result) {
          console.log(error, result);
          let logs = self.state.logs;
          logs.shift(result);
          self.setState({ logs });
        });
      });
  }

  render() {
    let { logs } = this.state;
    this.logContract();
    /*logs = [
      'contractedE{"deadline": "1498157065", "svalue": "30000000000000000", "observer": "0xf384a3de0a6fd5610300e7d12355e51fed35477c", "client": "0xbb5aeb01acf5b75bc36ec01f5137dd2728fbe983", "provider": "0xcd9492cdae7e8f8b5a648c6e15c4005c4cd9028b"',
      'contractedE{"deadline": "1498157065", "svalue": "30000000000000000", "observer": "0xf384a3de0a6fd5610300e7d12355e51fed35477c", "client": "0xbb5aeb01acf5b75bc36ec01f5137dd2728fbe983", "provider": "0xcd9492cdae7e8f8b5a648c6e15c4005c4cd9028b"',
      'contractedE{"deadline": "1498157065", "svalue": "30000000000000000", "observer": "0xf384a3de0a6fd5610300e7d12355e51fed35477c", "client": "0xbb5aeb01acf5b75bc36ec01f5137dd2728fbe983", "provider": "0xcd9492cdae7e8f8b5a648c6e15c4005c4cd9028b"',
    ];*/

    return React.createElement('ul', { className: 'dapp-account-list' },
      logs.map((l, i) => {
        return React.createElement('li', { key: 'li_' + i },
          React.createElement('span', {}, l)
        )
      })
    );
  }
}
