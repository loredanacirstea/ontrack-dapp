import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Contracts } from '../contracts.js';

Meteor.publish('contracts.all', function() {
  return Contracts.find();
});

Meteor.publish('contracts.network', function(networkId, limit) {
  check(networkId, String);
  check(limit, Match.Optional(String));

  let query = {}, options = {sort: {createdAt: -1}};
  if(networkId)
    query.networkId = networkId;
  if(limit)
    options.limit = limit;

  return Contracts.find(query, options);
});
