if(Meteor.isServer) {
  import '/imports/startup/fixtures.js';
  import '/imports/api/contract/server/methods.js';
  import '/imports/api/contract/server/publish.js';
  import '/imports/api/observer/server/methods.js';
  import '/imports/api/observer/server/publish.js';
}
