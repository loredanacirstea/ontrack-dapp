import { Mongo } from 'meteor/mongo';
import 'meteor/aldeed:collection2-core';
import SimpleSchema from 'simpl-schema';

const Observers = new Mongo.Collection("observers");

let ObserversSchema = new SimpleSchema({
  name: {
      type: String,
      max: 200
  },
  address: {
    type: String,
    optional: true
  },
  abi: {
    type: String,
    optional: true
  },
  data: {
    type: String,
    optional: true
  },
  gas: {
    type: String,
    optional: true
  },
  networkId: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
});

Observers.attachSchema(ObserversSchema);

export { Observers, ObserversSchema};
