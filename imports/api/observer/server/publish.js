import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Observers } from '../observers.js';

Meteor.publish('observers.all', function() {
  return Observers.find();
});

Meteor.publish('observers.network', function(networkId) {
  check(networkId, String);

  let query = {}
  if(networkId)
    query.networkId = networkId;

  return Observers.find(query);
});
