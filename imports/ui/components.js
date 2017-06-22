import React, { Component } from 'react';
import $ from 'jquery';

class Input extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.props.onChange($(ev.target).val());
  }

  render() {
    return React.createElement('div', {},
      React.createElement('span', {}, this.props.label),
      React.createElement('input',
        {name: 'input', label: 'Title', defaultValue: this.props.defaultValue, onChange: this.onChange}
      )
    );
  }
}

class Select extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    this.props.onChange($(ev.target).val());
  }

  render() {
    const { label, options } = this.props;

    return React.createElement('div', {},
      React.createElement('span', {}, label),
      React.createElement('select',
        {name: 'select', onChange: this.onChange},
        options.map((o, i) => {
          return React.createElement('option', {value:  o.value, key: i}, o.label);
        })
      )
    );
  }
}

class Button extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.props.onClick.bind(this);
  }

  render() {
    const { label, onClick } = this.props;
    return React.createElement('button',
      {name: 'button', onClick: this.onClick}, label
    );
  }
}

export { Input, Select, Button };
