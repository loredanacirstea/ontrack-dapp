import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Contracts from '../contracts.js';

Meteor.methods({
  'contracts.insert'({name, address, abi, deadline, provider, observer} = {}) {
    check(name, String);
    check(address, String);
    check(abi, String);
    check(deadline, Date);
    check(provider, String);
    check(observer, String);

    return Contracts.insert({
      name,
      address,
      abi,
      deadline,
      provider,
      observer
    });
  },
});
