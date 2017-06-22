import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Contracts } from '../contracts.js';

Meteor.publish('contracts.all', function() {
  return Contracts.find();
});

Meteor.publish('contracts.network', function(networkId) {
  check(networkId, String);

  let query = {}
  if(networkId)
    query.networkId = networkId;

  return Contracts.find(query);
});
