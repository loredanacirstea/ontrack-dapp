import React, { Component } from 'react';
import AddContract from '/imports/ui/AddContract.js';
import ObserverFeed from '/imports/ui/ObserverFeed.js';
import LiveFeed from '/imports/ui/LiveFeed.js';

export default class App extends Component {
  render() {
    let { web3, contracts, observers} = this.props;

    return React.createElement('div', {className: 'dapp-flex-content'},
      //React.createElement(ObserverFeed, {web3: web3, contracts, observers}),
      React.createElement(LiveFeed, {web3: web3, contracts, observers}),
      React.createElement(AddContract, {web3: web3, contracts, observers}),
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
