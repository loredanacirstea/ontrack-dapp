import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Observers from '../observers.js';

Meteor.methods({
  'observers.insert'({name, address, abi} = {}) {
    check(name, String);
    check(address, String);
    check(abi, String);

    return Observers.insert({
      name,
      address,
      abi
    });
  },
});
