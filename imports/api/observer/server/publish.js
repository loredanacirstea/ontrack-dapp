import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Observers } from '../observers.js';

Meteor.publish('observers.all', function() {
  return Observers.find();
});

Meteor.publish('observers.network', function(networkId, limit) {
  check(networkId, String);
  check(limit, Match.Optional(String));

  let query = {}, options = {sort: {createdAt: -1}};
  if(networkId)
    query.networkId = networkId;
  if(limit)
    options.limit = limit;

  return Observers.find(query, options);
});
