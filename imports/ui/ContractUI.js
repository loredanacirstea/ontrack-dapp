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
    let roles = ['client', 'provider', 'any'],
      role = 'not logged in with MetaMask!',
      account = web3.eth.accounts[0];

    if(account) {
      account = account.toLowerCase();
      if(account == contract.client.toLowerCase())
        role = 'client';
      else if(account == contract.provider.toLowerCase())
        role = 'provider';
      else
        role = 'no role';
    }
    this.contractInst = web3.eth.contract(JSON.parse(contract.abi)).at(contract.address);

    return React.createElement('div', {
      className: 'col col-1-2 tablet-col-1-1'
    },
      React.createElement('div', {},
        contract.name + ': ',
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
    this.startLogs = this.startLogs.bind(this);
    this.stopLogs = this.stopLogs.bind(this);
  }

  componentWillMount() {
    this.startLogs();
  }

  componentWillUnmount() {
    this.stopLogs();
  }

  componentWillReceiveProps(nextProps) {
    this.stopLogs();
    this.setState({ logs: [] });
    this.startLogs(nextProps);
  }

  stopLogs() {
    if(this.filter) {
      this.filter.stopWatching();
      this.filter = null;
    }
  }

  startLogs(props) {
    let { web3, contract, instance, events } = props || this.props;
    let self = this;

    // Watching from block 0 is time consuming, so get the block when the contract was created
    let deploymentBlock = web3.eth.getTransaction(contract.transactionHash, function(err, block) {
      if(err) return;

      // Watch all events on this contract
      self.filter = instance.allEvents({fromBlock: block.blockNumber, toBlock: 'latest'});
      self.filter.watch(function(error, log) {
        let logs = self.state.logs;
        logs.push(log);
        self.setState({ logs });
      });
    });
  }

  render() {
    let { logs } = this.state;

    return React.createElement('ul', { className: 'dapp-account-list' },
      logs.map((l, i) => {
        return React.createElement('li', { key: 'li_' + i, className: "dapp-logs" },
          React.createElement('h3', {}, 'Event ' + l.event),
          Object.keys(l.args).map(key => {
            return React.createElement('div', { key }, key + ': ' + l.args[key])
          })
        )
      })
    );
  }
}
