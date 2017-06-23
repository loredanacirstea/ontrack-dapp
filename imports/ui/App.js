import React, { Component } from 'react';
import AddContract from '/imports/ui/AddContract.js';
import ContractUI from '/imports/ui/ContractUI.js';
import ContractList from '/imports/ui/ContractList.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  onClick(contract) {
    this.setState({ contract });
  }

  render() {
    let { web3, contracts, observers} = this.props;
    let { contract, observer } = this.state;

    return React.createElement('div', {className: 'dapp-flex-content'},
      React.createElement(ContractList, {web3: web3, contracts, onClick: this.onClick}),
      React.createElement(ContractUI, {web3: web3, contract}),
      React.createElement(AddContract, {web3: web3, observers})
    )
  }
}

App.propTypes = {
  web3: React.PropTypes.object,
  contracts: React.PropTypes.array,
  observers: React.PropTypes.array,
  loading: React.PropTypes.bool,
  connected: React.PropTypes.bool,
  networkId: React.PropTypes.string
};
