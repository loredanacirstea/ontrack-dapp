import React, { Component } from 'react';

export default class ContractList extends Component {
  render() {
    const { contracts=[], onClick } = this.props;

    return React.createElement('div', {className: 'dapp-aside'},
      contracts.map(c => {
        return React.createElement(ContractComponent, { key: c._id, contract: c, onClick });
      })
    );
  }
}

class ContractComponent extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick.call(null, this.props.contract);
  }

  render() {
    const { contract } = this.props;

    return React.createElement('a', {
      className: 'dapp-small',
      href: '#',
      onClick: this.onClick
    },
      React.createElement('h3', {}, contract.name)
    );
  }
}
