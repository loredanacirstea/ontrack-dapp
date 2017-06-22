import React, { Component } from 'react';
import { ethAddressAPI } from '/imports/api/namespace.js';

export default class LiveFeed extends Component {
  render() {
    const { contracts=[] } = this.props;

    return React.createElement('div', {className: 'dapp-aside'},
      contracts.map(c => {
        return React.createElement(ContractComponent, { key: c._id, contract: c });
      })
    );
  }
}

class ContractComponent extends Component {
  render() {
    const { contract } = this.props;
    let href = ethAddressAPI + contract.address

    return React.createElement('a', {className: 'dapp-small', href, target: '_blank'},
      React.createElement('h3', {}, contract.name)
    );
  }
}
